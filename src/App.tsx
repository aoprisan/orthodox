import { useEffect, useMemo, useState } from 'react';
import type { CalendarKind } from './types';
import { Header } from './components/Header';
import { MonthGrid } from './components/MonthGrid';
import { DayDetail } from './components/DayDetail';
import { startOfDayUTC } from './lib/julian';

const STORAGE_KEY = 'orthodox-calendar:kind';

function todayUTC(): Date {
  return startOfDayUTC(new Date());
}

function parseHash(): { y: number; m: number; d: number } | null {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const match = hash.match(/^(\d{4})\/(\d{1,2})(?:\/(\d{1,2}))?$/);
  if (!match) return null;
  const y = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const d = match[3] ? parseInt(match[3], 10) : 1;
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  return { y, m, d };
}

function writeHash(date: Date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  const next = `#/${y}/${m}/${d}`;
  if (window.location.hash !== next) {
    history.replaceState(null, '', next);
  }
}

export function App() {
  const initial = parseHash();
  const [selected, setSelected] = useState<Date>(() =>
    initial
      ? new Date(Date.UTC(initial.y, initial.m - 1, initial.d))
      : todayUTC(),
  );
  const [kind, setKind] = useState<CalendarKind>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'old' ? 'old' : 'new';
  });

  const [viewYear, setViewYear] = useState<number>(selected.getUTCFullYear());
  const [viewMonth, setViewMonth] = useState<number>(selected.getUTCMonth() + 1);

  useEffect(() => {
    writeHash(selected);
  }, [selected]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, kind);
  }, [kind]);

  useEffect(() => {
    const onHash = () => {
      const parsed = parseHash();
      if (parsed) {
        const next = new Date(Date.UTC(parsed.y, parsed.m - 1, parsed.d));
        setSelected(next);
        setViewYear(parsed.y);
        setViewMonth(parsed.m);
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const handlePrev = () => {
    let y = viewYear;
    let m = viewMonth - 1;
    if (m < 1) {
      m = 12;
      y -= 1;
    }
    setViewYear(y);
    setViewMonth(m);
  };
  const handleNext = () => {
    let y = viewYear;
    let m = viewMonth + 1;
    if (m > 12) {
      m = 1;
      y += 1;
    }
    setViewYear(y);
    setViewMonth(m);
  };
  const handleToday = () => {
    const t = todayUTC();
    setSelected(t);
    setViewYear(t.getUTCFullYear());
    setViewMonth(t.getUTCMonth() + 1);
  };
  const handleSelect = (date: Date) => {
    setSelected(date);
    setViewYear(date.getUTCFullYear());
    setViewMonth(date.getUTCMonth() + 1);
  };

  const fastLegend = useMemo(
    () => [
      { level: 'strict', label: 'Strict' },
      { level: 'wine-oil', label: 'Wine & Oil' },
      { level: 'fish', label: 'Fish' },
      { level: 'dairy', label: 'Dairy' },
      { level: 'fast-free', label: 'Fast-free' },
    ],
    [],
  );

  return (
    <div className="app">
      <Header
        year={viewYear}
        month={viewMonth}
        kind={kind}
        onPrev={handlePrev}
        onNext={handleNext}
        onToday={handleToday}
        onKindChange={setKind}
      />
      <main className="layout">
        <MonthGrid
          year={viewYear}
          month={viewMonth}
          selected={selected}
          kind={kind}
          onSelect={handleSelect}
        />
        <DayDetail date={selected} kind={kind} />
      </main>
      <div className="legend">
        {fastLegend.map((l) => (
          <span key={l.level} className="legend__item">
            <span className="legend__swatch" style={{ background: `var(--fast-${l.level})` }} />
            {l.label}
          </span>
        ))}
      </div>
      <footer className="footer">
        Καλὴ Σαρακοστή · A static calendar; consult your priest for the rule
        of your parish.
      </footer>
    </div>
  );
}
