import { useEffect, useMemo, useState } from 'react';
import type { CalendarKind, FastLevel, Lang } from './types';
import { Header } from './components/Header';
import { MonthGrid } from './components/MonthGrid';
import { DayDetail } from './components/DayDetail';
import { TodayCard } from './components/TodayCard';
import { startOfDayUTC } from './lib/julian';
import { t, tLegendLevel } from './i18n/strings';

const KIND_KEY = 'orthodox-calendar:kind';
const LANG_KEY = 'orthodox-calendar:lang';

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

function detectInitialLang(): Lang {
  const stored = localStorage.getItem(LANG_KEY);
  if (stored === 'ro' || stored === 'en') return stored;
  const nav = navigator.language?.toLowerCase() ?? '';
  if (nav.startsWith('ro')) return 'ro';
  return 'en';
}

export function App() {
  // Always start on today. The URL hash is auto-persisted on every `selected`
  // change, so honouring it on mount would pin the lower panel to whatever
  // date was last viewed in a previous session — leaving it stale while the
  // top "Today" panel correctly shows the actual current day.
  const [selected, setSelected] = useState<Date>(todayUTC);
  const [kind, setKind] = useState<CalendarKind>(() => {
    const stored = localStorage.getItem(KIND_KEY);
    return stored === 'old' ? 'old' : 'new';
  });
  const [lang, setLang] = useState<Lang>(detectInitialLang);

  const [viewYear, setViewYear] = useState<number>(selected.getUTCFullYear());
  const [viewMonth, setViewMonth] = useState<number>(selected.getUTCMonth() + 1);

  const today = useMemo(() => todayUTC(), []);

  useEffect(() => {
    writeHash(selected);
  }, [selected]);

  useEffect(() => {
    localStorage.setItem(KIND_KEY, kind);
  }, [kind]);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

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
    const tDate = todayUTC();
    setSelected(tDate);
    setViewYear(tDate.getUTCFullYear());
    setViewMonth(tDate.getUTCMonth() + 1);
  };
  const handleSelect = (date: Date) => {
    setSelected(date);
    setViewYear(date.getUTCFullYear());
    setViewMonth(date.getUTCMonth() + 1);
  };

  const legendItems: FastLevel[] = ['strict', 'wine-oil', 'fish', 'dairy', 'fast-free'];

  return (
    <div className="app">
      <Header
        year={viewYear}
        month={viewMonth}
        kind={kind}
        lang={lang}
        onPrev={handlePrev}
        onNext={handleNext}
        onToday={handleToday}
        onKindChange={setKind}
        onLangChange={setLang}
      />
      <TodayCard today={today} kind={kind} lang={lang} onJump={handleSelect} />
      <main className="layout">
        <MonthGrid
          year={viewYear}
          month={viewMonth}
          selected={selected}
          kind={kind}
          lang={lang}
          onSelect={handleSelect}
        />
        <DayDetail date={selected} kind={kind} lang={lang} />
      </main>
      <div className="legend">
        {legendItems.map((level) => (
          <span key={level} className="legend__item">
            <span className="legend__swatch" style={{ background: `var(--fast-${level})` }} />
            {tLegendLevel(level, lang)}
          </span>
        ))}
      </div>
      <footer className="footer">{t('footer', lang)}</footer>
    </div>
  );
}
