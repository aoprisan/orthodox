import type { CalendarKind, Feast } from '../types';
import { entryForDate } from '../lib/feasts';
import { fastFor } from '../lib/fasting';
import { gregorianToJulian } from '../lib/julian';

interface Props {
  date: Date;
  kind: CalendarKind;
}

const RANK_LABEL: Record<Feast['rank'], string> = {
  great: 'Great Feast',
  major: 'Major Feast',
  minor: 'Commemoration',
};

const FAST_LABEL: Record<string, string> = {
  'strict': 'Strict Fast',
  'wine-oil': 'Wine & Oil',
  'fish': 'Fish Permitted',
  'dairy': 'Dairy Permitted',
  'fast-free': 'Fast-Free',
};

export function DayDetail({ date, kind }: Props) {
  const entry = entryForDate(date, kind);
  const fast = fastFor(date, kind);
  const julian = gregorianToJulian(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
  );

  const civilLabel = date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

  const altLabel =
    kind === 'new'
      ? `Julian: ${monthName(julian.m)} ${julian.d}`
      : `Gregorian: ${monthName(date.getUTCMonth() + 1)} ${date.getUTCDate()}`;

  const sortedFeasts = [...entry.feasts].sort(
    (a, b) => rankWeight(b.rank) - rankWeight(a.rank),
  );

  return (
    <aside className="detail arch">
      <h2 className="detail__date">{civilLabel}</h2>
      <p className="detail__weekday">{altLabel}</p>

      <div className="detail__fast">
        <span className="fast-pill" data-level={fast.level}>
          {FAST_LABEL[fast.level]}
        </span>
        <span className="detail__fast-reason">{fast.reason}</span>
      </div>

      <div className="detail__section">
        <h3 className="detail__section-title">Feasts</h3>
        {sortedFeasts.length === 0 ? (
          <p className="empty">No feast commemorated.</p>
        ) : (
          <ul className="feast-list">
            {sortedFeasts.map((f) => (
              <li key={f.name} className="feast-item" data-rank={f.rank}>
                <span className="feast-item__rank">{RANK_LABEL[f.rank]}</span>
                <span className="feast-mark" aria-hidden="true">✚ </span>
                {f.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="detail__section">
        <h3 className="detail__section-title">Saints</h3>
        {entry.saints.length === 0 ? (
          <p className="empty">Synaxarion not loaded for this day.</p>
        ) : (
          <ul className="saint-list">
            {entry.saints.map((s) => (
              <li key={s.name} className="saint-item dropcap">
                <span className="saint-item__name">{s.name}</span>
                {s.title ? <span className="saint-item__title">{s.title}</span> : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
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

function monthName(m: number): string {
  return [
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
  ][m - 1];
}
