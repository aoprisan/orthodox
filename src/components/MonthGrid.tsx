import type { CalendarKind, Lang } from '../types';
import { addDays, sameDay, startOfDayUTC } from '../lib/julian';
import { locale } from '../i18n/strings';
import { DayCell } from './DayCell';

interface Props {
  year: number;
  month: number; // 1..12
  selected: Date;
  kind: CalendarKind;
  lang: Lang;
  onSelect: (date: Date) => void;
}

function buildDays(year: number, month: number): Date[] {
  const first = new Date(Date.UTC(year, month - 1, 1));
  const startWeekday = first.getUTCDay();
  const start = addDays(first, -startWeekday);
  const days: Date[] = [];
  for (let i = 0; i < 42; i += 1) {
    days.push(addDays(start, i));
  }
  return days;
}

function weekdayLabels(lang: Lang): string[] {
  const fmt = new Intl.DateTimeFormat(locale(lang), { weekday: 'short', timeZone: 'UTC' });
  // Sunday-first week. Pick any Sunday as anchor (Jan 4 1970 was a Sunday).
  const sunday = new Date(Date.UTC(1970, 0, 4));
  return Array.from({ length: 7 }, (_, i) =>
    fmt.format(addDays(sunday, i)).replace(/\.$/, ''),
  );
}

export function MonthGrid({ year, month, selected, kind, lang, onSelect }: Props) {
  const days = buildDays(year, month);
  const today = startOfDayUTC(new Date());
  const weekdays = weekdayLabels(lang);

  return (
    <section className="month meander-border parchment" aria-label={`${year}-${month}`}>
      <div className="month__weekdays">
        {weekdays.map((w, i) => (
          <div key={i} className="month__weekday">
            {w}
          </div>
        ))}
      </div>
      <div className="month__grid" role="grid">
        {days.map((d) => (
          <DayCell
            key={d.toISOString()}
            date={d}
            inMonth={d.getUTCMonth() === month - 1}
            isToday={sameDay(d, today)}
            isSelected={sameDay(d, selected)}
            kind={kind}
            lang={lang}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}
