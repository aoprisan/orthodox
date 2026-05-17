import type { CalendarKind, FastInfo, Feast } from '../types';
import { entryForDate, highestRank } from '../lib/feasts';
import { fastFor } from '../lib/fasting';

interface Props {
  date: Date;
  inMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  kind: CalendarKind;
  onSelect: (date: Date) => void;
}

function topFeastLabel(feasts: Feast[]): string {
  const ordered = [...feasts].sort((a, b) => rankWeight(b.rank) - rankWeight(a.rank));
  return ordered[0]?.name ?? '';
}

function rankWeight(rank: Feast['rank']): number {
  switch (rank) {
    case 'great':
      return 3;
    case 'major':
      return 2;
    case 'minor':
      return 1;
  }
}

export function DayCell({ date, inMonth, isToday, isSelected, kind, onSelect }: Props) {
  const entry = entryForDate(date, kind);
  const fast: FastInfo = fastFor(date, kind);
  const rank = highestRank(entry.feasts);
  const feastLabel = topFeastLabel(entry.feasts);

  return (
    <button
      type="button"
      className="day"
      data-outside={!inMonth}
      data-today={isToday}
      data-selected={isSelected}
      data-rank={rank ?? undefined}
      onClick={() => onSelect(date)}
      aria-label={`${date.toLocaleDateString(undefined, { dateStyle: 'full' })}${feastLabel ? ' — ' + feastLabel : ''}`}
    >
      <span
        className="day__fastdot"
        data-level={fast.level}
        title={fast.reason}
        aria-hidden="true"
      />
      <span className="day__num">{date.getUTCDate()}</span>
      {feastLabel ? <span className="day__feast">{feastLabel}</span> : null}
    </button>
  );
}
