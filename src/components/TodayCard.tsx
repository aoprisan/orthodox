import type { CalendarKind, Feast, Lang } from '../types';
import { entryForDate, highestRank } from '../lib/feasts';
import { fastFor } from '../lib/fasting';
import { locale, t, tFastLevel, tFastReason } from '../i18n/strings';
import { translateName } from '../i18n/names';

interface Props {
  today: Date;
  kind: CalendarKind;
  lang: Lang;
  onJump: (date: Date) => void;
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

export function TodayCard({ today, kind, lang, onJump }: Props) {
  const entry = entryForDate(today, kind);
  const fast = fastFor(today, kind);
  const rank = highestRank(entry.feasts);
  const top = [...entry.feasts].sort((a, b) => rankWeight(b.rank) - rankWeight(a.rank))[0];

  const dateLabel = new Intl.DateTimeFormat(locale(lang), {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(today);

  return (
    <section
      className="today-card"
      data-rank={rank ?? undefined}
      aria-label={t('todayHeader', lang)}
    >
      <div className="today-card__ribbon">
        <span className="today-card__label">{t('todayHeader', lang)}</span>
      </div>
      <div className="today-card__body">
        <button
          type="button"
          className="today-card__date"
          onClick={() => onJump(today)}
          title={t('goToToday', lang)}
        >
          {dateLabel}
        </button>
        <div className="today-card__pill">
          <span className="fast-pill" data-level={fast.level}>
            {tFastLevel(fast.level, lang)}
          </span>
          <span className="today-card__reason">{tFastReason(fast.code, lang)}</span>
        </div>
        {top ? (
          <div className="today-card__feast">
            <span className="feast-mark" aria-hidden="true">✚ </span>
            {translateName(top.name, lang)}
          </div>
        ) : null}
        {entry.saints.length > 0 ? (
          <div className="today-card__saints">
            {entry.saints
              .slice(0, 3)
              .map((s) => translateName(s.name, lang))
              .join(' · ')}
          </div>
        ) : null}
      </div>
    </section>
  );
}
