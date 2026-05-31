import type { CalendarKind, Feast, Lang, Saint } from '../types';
import { entryForDate } from '../lib/feasts';
import { fastFor } from '../lib/fasting';
import { servicesFor } from '../lib/services';
import { gregorianToJulian } from '../lib/julian';
import { formatServiceTime, locale, t, tFastLevel, tFastReason, tRank, tService } from '../i18n/strings';
import { loc } from '../i18n/loc';
import { translateName } from '../i18n/names';
import { SaintLifeSection } from './SaintLifeSection';

interface Props {
  date: Date;
  kind: CalendarKind;
  lang: Lang;
}

export function DayDetail({ date, kind, lang }: Props) {
  const entry = entryForDate(date, kind);
  const fast = fastFor(date, kind);
  const services = servicesFor(date, kind);
  const julian = gregorianToJulian(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
  );

  const civilLabel = new Intl.DateTimeFormat(locale(lang), {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);

  const altLabel =
    kind === 'new'
      ? `${t('julianPrefix', lang)} ${monthName(julian.m, lang)} ${julian.d}`
      : `${t('gregorianPrefix', lang)} ${monthName(date.getUTCMonth() + 1, lang)} ${date.getUTCDate()}`;

  const sortedFeasts = [...entry.feasts].sort(
    (a, b) => rankWeight(b.rank) - rankWeight(a.rank),
  );

  // Secondary saints from the OCA Julian dataset are stored as plain English
  // strings with no Romanian translation in names.ts. In Romanian mode they
  // would otherwise render as English; hide them so the RO view stays
  // Romanian. Principal saints (always `{en, ro}`) and PasiSfinti additions
  // (RO duplicated into both slots) pass through unchanged.
  const visibleSaints =
    lang === 'ro'
      ? entry.saints.filter((s) => !isUntranslatedEnglish(s))
      : entry.saints;

  return (
    <aside className="detail arch">
      <h2 className="detail__date">{civilLabel}</h2>
      <p className="detail__weekday">{altLabel}</p>

      <div className="detail__fast">
        <span className="fast-pill" data-level={fast.level}>
          {tFastLevel(fast.level, lang)}
        </span>
        <span className="detail__fast-reason">{tFastReason(fast.code, lang)}</span>
      </div>

      <div className="detail__section">
        <h3 className="detail__section-title">{t('services', lang)}</h3>
        {services.length === 0 ? (
          <p className="empty">{t('noService', lang)}</p>
        ) : (
          <ul className="service-list">
            {services.map((s, i) => (
              <li key={i} className="service-item">
                <span className="service-item__time">{formatServiceTime(s.time, lang)}</span>
                <span className="service-item__name">{tService(s.code, lang)}</span>
              </li>
            ))}
          </ul>
        )}
        {services.length > 0 ? (
          <p className="detail__source">{t('servicesNote', lang)}</p>
        ) : null}
      </div>

      <div className="detail__section">
        <h3 className="detail__section-title">{t('feasts', lang)}</h3>
        {sortedFeasts.length === 0 ? (
          <p className="empty">{t('noFeast', lang)}</p>
        ) : (
          <ul className="feast-list">
            {sortedFeasts.map((f, i) => (
              <li key={i} className="feast-item" data-rank={f.rank}>
                <span className="feast-item__rank">{tRank(f.rank, lang)}</span>
                <span className="feast-mark" aria-hidden="true">✚ </span>
                {loc(f.name, lang)}
                {f.note ? <span className="feast-item__note">{loc(f.note, lang)}</span> : null}
                {f.about ? (
                  <details className="feast-item__about">
                    <summary>{t('aboutFeast', lang)}</summary>
                    <p>{loc(f.about, lang)}</p>
                  </details>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="detail__section">
        <h3 className="detail__section-title">{t('saints', lang)}</h3>
        {visibleSaints.length === 0 ? (
          <p className="empty">{t('noSaints', lang)}</p>
        ) : (
          <ul className="saint-list">
            {visibleSaints.map((s, i) => (
              <li
                key={i}
                className={`saint-item${s.secondary ? ' saint-item--secondary' : ' dropcap'}`}
              >
                <span className="saint-item__name">{loc(s.name, lang)}</span>
                {s.title ? <span className="saint-item__title">{loc(s.title, lang)}</span> : null}
                {s.note ? <span className="saint-item__note">{loc(s.note, lang)}</span> : null}
              </li>
            ))}
          </ul>
        )}
        {visibleSaints.some((s) => s.secondary) ? (
          <p className="detail__source">{t('synaxarionSource', lang)}</p>
        ) : null}
      </div>

      <SaintLifeSection date={date} kind={kind} lang={lang} />
    </aside>
  );
}

function isUntranslatedEnglish(s: Saint): boolean {
  const n = s.name;
  if (typeof n === 'string') return translateName(n, 'ro') === n;
  if (!n.ro) return true;
  return false;
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

function monthName(m: number, lang: Lang): string {
  return new Intl.DateTimeFormat(locale(lang), { month: 'long', timeZone: 'UTC' }).format(
    new Date(Date.UTC(2000, m - 1, 1)),
  );
}
