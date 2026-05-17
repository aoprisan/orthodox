import type { CalendarKind, Lang } from '../types';
import { CalendarToggle } from './CalendarToggle';
import { LangSelector } from './LangSelector';
import { locale, t } from '../i18n/strings';

interface Props {
  year: number;
  month: number; // 1..12
  kind: CalendarKind;
  lang: Lang;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onKindChange: (kind: CalendarKind) => void;
  onLangChange: (lang: Lang) => void;
}

export function Header({
  year,
  month,
  kind,
  lang,
  onPrev,
  onNext,
  onToday,
  onKindChange,
  onLangChange,
}: Props) {
  const monthLabel = new Intl.DateTimeFormat(locale(lang), {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, 1)));

  return (
    <header className="header">
      <Tympanum />
      <h1 className="header__title" aria-label={t('appTitle', lang)}>
        <span className="header__title-text">{t('appTitle', lang)}</span>
      </h1>
      <div className="header__subtitle">{t('appSubtitle', lang)}</div>
      <div className="header__controls">
        <div className="month-nav">
          <button
            type="button"
            className="icon-btn"
            aria-label={t('prevMonth', lang)}
            onClick={onPrev}
          >
            ◀
          </button>
          <span className="month-nav__label">{monthLabel}</span>
          <button
            type="button"
            className="icon-btn"
            aria-label={t('nextMonth', lang)}
            onClick={onNext}
          >
            ▶
          </button>
        </div>
        <button type="button" className="today-btn" onClick={onToday}>
          {t('today', lang)}
        </button>
        <CalendarToggle kind={kind} lang={lang} onChange={onKindChange} />
        <LangSelector lang={lang} onChange={onLangChange} />
      </div>
    </header>
  );
}

function Tympanum() {
  return (
    <svg
      className="header__tympanum"
      viewBox="0 0 540 64"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="tympGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6e198" />
          <stop offset="0.55" stopColor="#c9a227" />
          <stop offset="1" stopColor="#5a4710" />
        </linearGradient>
        <linearGradient id="tympRule" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(138,109,26,0)" />
          <stop offset="0.5" stopColor="#c9a227" />
          <stop offset="1" stopColor="rgba(138,109,26,0)" />
        </linearGradient>
      </defs>
      {/* Two horizontal gold rules, fading in from the margins */}
      <rect x="0" y="36" width="540" height="1" fill="url(#tympRule)" />
      <rect x="0" y="58" width="540" height="0.6" fill="url(#tympRule)" opacity="0.6" />
      {/* Left arabesque */}
      <g
        fill="none"
        stroke="url(#tympRule)"
        strokeWidth="1.1"
        strokeLinecap="round"
      >
        <path d="M30 46 C 80 46, 110 30, 160 46 S 220 46, 240 46" />
        <circle cx="30" cy="46" r="2" fill="#c9a227" stroke="none" />
        <circle cx="240" cy="46" r="2" fill="#c9a227" stroke="none" />
        <path d="M120 38 c 4 -6, 12 -6, 14 0 M134 38 c 4 6, 12 6, 14 0" />
      </g>
      {/* Right arabesque mirrors */}
      <g
        fill="none"
        stroke="url(#tympRule)"
        strokeWidth="1.1"
        strokeLinecap="round"
        transform="translate(540 0) scale(-1 1)"
      >
        <path d="M30 46 C 80 46, 110 30, 160 46 S 220 46, 240 46" />
        <circle cx="30" cy="46" r="2" fill="#c9a227" stroke="none" />
        <circle cx="240" cy="46" r="2" fill="#c9a227" stroke="none" />
        <path d="M120 38 c 4 -6, 12 -6, 14 0 M134 38 c 4 6, 12 6, 14 0" />
      </g>
      {/* Central cross pattée with flared arms — the visual anchor */}
      <g transform="translate(270 28)">
        <circle r="20" fill="rgba(110,31,44,0.5)" />
        <circle r="20" fill="none" stroke="#c9a227" strokeWidth="1" />
        <path
          d="M0 -16 L4 -10 L9 -14 L4 -7 L14 -7 L14 -3 L10 0 L14 3 L14 7 L4 7 L9 14 L4 10 L0 16 L-4 10 L-9 14 L-4 7 L-14 7 L-14 3 L-10 0 L-14 -3 L-14 -7 L-4 -7 L-9 -14 L-4 -10 Z"
          fill="url(#tympGold)"
          stroke="#5a4710"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
        <circle r="2.4" fill="#6e1f2c" />
      </g>
    </svg>
  );
}
