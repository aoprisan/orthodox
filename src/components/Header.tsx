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
      <h1 className="header__title">{t('appTitle', lang)}</h1>
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
