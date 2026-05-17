import type { CalendarKind } from '../types';
import { CalendarToggle } from './CalendarToggle';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface Props {
  year: number;
  month: number; // 1..12
  kind: CalendarKind;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onKindChange: (kind: CalendarKind) => void;
}

export function Header({ year, month, kind, onPrev, onNext, onToday, onKindChange }: Props) {
  return (
    <header className="header">
      <h1 className="header__title">Orthodox Calendar</h1>
      <div className="header__subtitle">Feasts, Saints &amp; the Holy Fasts</div>
      <div className="header__controls">
        <div className="month-nav">
          <button
            type="button"
            className="icon-btn"
            aria-label="Previous month"
            onClick={onPrev}
          >
            ◀
          </button>
          <span className="month-nav__label">
            {MONTH_NAMES[month - 1]} {year}
          </span>
          <button
            type="button"
            className="icon-btn"
            aria-label="Next month"
            onClick={onNext}
          >
            ▶
          </button>
        </div>
        <button type="button" className="today-btn" onClick={onToday}>
          Today
        </button>
        <CalendarToggle kind={kind} onChange={onKindChange} />
      </div>
    </header>
  );
}
