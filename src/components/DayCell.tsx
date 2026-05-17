import type { CalendarKind, FastInfo, Feast, Lang } from '../types';
import { entryForDate, highestRank } from '../lib/feasts';
import { fastFor } from '../lib/fasting';
import { loc } from '../i18n/loc';

interface Props {
  date: Date;
  inMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  kind: CalendarKind;
  lang: Lang;
  onSelect: (date: Date) => void;
  index?: number;
}

function topFeast(feasts: Feast[]): Feast | undefined {
  const ordered = [...feasts].sort((a, b) => rankWeight(b.rank) - rankWeight(a.rank));
  return ordered[0];
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

export function DayCell({
  date,
  inMonth,
  isToday,
  isSelected,
  kind,
  lang,
  onSelect,
  index = 0,
}: Props) {
  const entry = entryForDate(date, kind);
  const fast: FastInfo = fastFor(date, kind);
  const rank = highestRank(entry.feasts);
  const top = topFeast(entry.feasts);
  const label = top ? loc(top.name, lang) : '';

  return (
    <button
      type="button"
      className="day"
      data-outside={!inMonth}
      data-today={isToday}
      data-selected={isSelected}
      data-rank={rank ?? undefined}
      data-dow={date.getUTCDay()}
      style={{ ['--i' as string]: index }}
      onClick={() => onSelect(date)}
      aria-label={`${date.toLocaleDateString(undefined, { dateStyle: 'full' })}${label ? ' — ' + label : ''}`}
    >
      <span
        className="day__fastdot"
        data-level={fast.level}
        aria-hidden="true"
      />
      <span className="day__num">{date.getUTCDate()}</span>
      {label ? <span className="day__feast">{label}</span> : null}
    </button>
  );
}
