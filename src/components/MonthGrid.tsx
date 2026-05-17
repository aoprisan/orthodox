import type { CalendarKind } from '../types';
import { addDays, sameDay, startOfDayUTC } from '../lib/julian';
import { DayCell } from './DayCell';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface Props {
  year: number;
  month: number; // 1..12
  selected: Date;
  kind: CalendarKind;
  onSelect: (date: Date) => void;
}

function buildDays(year: number, month: number): Date[] {
  const first = new Date(Date.UTC(year, month - 1, 1));
  const startWeekday = first.getUTCDay(); // 0=Sun
  const start = addDays(first, -startWeekday);
  const days: Date[] = [];
  for (let i = 0; i < 42; i += 1) {
    days.push(addDays(start, i));
  }
  return days;
}

export function MonthGrid({ year, month, selected, kind, onSelect }: Props) {
  const days = buildDays(year, month);
  const today = startOfDayUTC(new Date());

  return (
    <section className="month meander-border parchment" aria-label={`${year}-${month} calendar grid`}>
      <div className="month__weekdays">
        {WEEKDAYS.map((w) => (
          <div key={w} className="month__weekday">
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
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}
