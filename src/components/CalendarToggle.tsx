import type { CalendarKind } from '../types';

interface Props {
  kind: CalendarKind;
  onChange: (kind: CalendarKind) => void;
}

export function CalendarToggle({ kind, onChange }: Props) {
  return (
    <div className="calendar-toggle" role="group" aria-label="Calendar style">
      <button
        type="button"
        aria-pressed={kind === 'new'}
        onClick={() => onChange('new')}
        title="Revised Julian Calendar (Greek, Antiochian, OCA, …)"
      >
        New Calendar
      </button>
      <button
        type="button"
        aria-pressed={kind === 'old'}
        onClick={() => onChange('old')}
        title="Julian Calendar (Russian, Serbian, Jerusalem, Athonite)"
      >
        Old Calendar
      </button>
    </div>
  );
}
