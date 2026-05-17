import type { CalendarKind, Lang } from '../types';
import { t } from '../i18n/strings';

interface Props {
  kind: CalendarKind;
  lang: Lang;
  onChange: (kind: CalendarKind) => void;
}

export function CalendarToggle({ kind, lang, onChange }: Props) {
  return (
    <div className="calendar-toggle" role="group" aria-label={t('newCalendar', lang)}>
      <button
        type="button"
        aria-pressed={kind === 'new'}
        onClick={() => onChange('new')}
        title={t('newCalendarTitle', lang)}
      >
        {t('newCalendar', lang)}
      </button>
      <button
        type="button"
        aria-pressed={kind === 'old'}
        onClick={() => onChange('old')}
        title={t('oldCalendarTitle', lang)}
      >
        {t('oldCalendar', lang)}
      </button>
    </div>
  );
}
