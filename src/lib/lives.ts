import type { CalendarKind, DayLives } from '../types';
import { gregorianToJulian, ymdFromDate } from './julian';

type MonthMap = Record<string, DayLives>;

const monthCache = new Map<string, Promise<MonthMap | null>>();

function loadMonth(mm: string): Promise<MonthMap | null> {
  let cached = monthCache.get(mm);
  if (cached) return cached;
  const url = `${import.meta.env.BASE_URL}lives/${mm}.json`;
  cached = fetch(url)
    .then((r) => (r.ok ? (r.json() as Promise<MonthMap>) : null))
    .catch(() => null);
  monthCache.set(mm, cached);
  return cached;
}

export async function livesForDate(
  date: Date,
  kind: CalendarKind,
): Promise<DayLives | null> {
  const { m, d } =
    kind === 'old'
      ? gregorianToJulian(
          date.getUTCFullYear(),
          date.getUTCMonth() + 1,
          date.getUTCDate(),
        )
      : ymdFromDate(date);
  const mm = String(m).padStart(2, '0');
  const dd = String(d).padStart(2, '0');
  const month = await loadMonth(mm);
  return month?.[dd] ?? null;
}
