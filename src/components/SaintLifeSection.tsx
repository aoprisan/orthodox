import { useEffect, useState } from 'react';
import type { CalendarKind, DayLives, Lang } from '../types';
import { livesForDate } from '../lib/lives';
import { t } from '../i18n/strings';

interface Props {
  date: Date;
  kind: CalendarKind;
  lang: Lang;
}

type LoadState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ready'; data: DayLives | null };

export function SaintLifeSection({ date, kind, lang }: Props) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<LoadState>({ status: 'idle' });

  useEffect(() => {
    setOpen(false);
    setState({ status: 'idle' });
  }, [date, kind]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    // Functional update keeps the load idempotent across re-opens without
    // putting `state.status` in the dep array — doing so would re-fire this
    // effect the moment we transition to 'loading', cancelling the in-flight
    // fetch before it can resolve and leaving the section stuck on the spinner.
    setState((prev) => (prev.status === 'idle' ? { status: 'loading' } : prev));
    livesForDate(date, kind).then((data) => {
      if (!cancelled) setState({ status: 'ready', data });
    });
    return () => {
      cancelled = true;
    };
  }, [open, date, kind]);

  const data = state.status === 'ready' ? state.data : null;
  const count = data ? data.sections.length : null;

  return (
    <details
      className="lives detail__section"
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="lives__summary">
        <span className="lives__title">{t('livesTitle', lang)}</span>
        {count !== null ? <span className="lives__count">· {count}</span> : null}
      </summary>

      {open && state.status === 'loading' ? (
        <p className="lives__status">{t('livesLoading', lang)}</p>
      ) : null}
      {open && state.status === 'ready' && !data ? (
        <p className="lives__status empty">{t('livesEmpty', lang)}</p>
      ) : null}
      {open && data ? <LivesBody data={data} lang={lang} /> : null}
    </details>
  );
}

function LivesBody({ data, lang }: { data: DayLives; lang: Lang }) {
  return (
    <div className="lives__body">
      {lang === 'en' ? (
        <p className="lives__lang-notice">{t('livesLangNotice', lang)}</p>
      ) : null}
      {data.sections.map((s, i) => (
        <section key={i} className="lives__section">
          <h4 className="lives__section-title">{s.title}</h4>
          {s.paragraphs.map((p, j) => (
            <p key={j} className="lives__paragraph">
              {p}
            </p>
          ))}
        </section>
      ))}
      {data.closing ? <p className="lives__closing">{data.closing}</p> : null}
      <p className="lives__source">
        {t('livesSource', lang)}{' '}
        <a href={data.sourceUrl} target="_blank" rel="noreferrer">
          calendar-ortodox.ro
        </a>
      </p>
    </div>
  );
}
