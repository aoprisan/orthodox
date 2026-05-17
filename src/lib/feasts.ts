import type { CalendarKind, DayEntry, Feast } from '../types';
import { gregorianToJulian, mmdd, ymdFromDate } from './julian';
import { fixedFeasts } from '../data/fixedFeasts';
import { moveableFeastsOn } from './moveableFeasts';

/**
 * Given a civil (Gregorian) date and the user's calendar selection, return the
 * combined liturgical entry for the day.
 *
 * - `new` (Revised Julian): fixed feasts are keyed by the civil date as
 *   shown — Christmas is December 25 on the wall calendar.
 * - `old` (Julian): the civil date is converted to Julian first, then used
 *   as the lookup key — so Christmas (Julian Dec 25) lands on civil Jan 7.
 */
export function entryForDate(date: Date, kind: CalendarKind): DayEntry {
  const { m, d } = kind === 'old' ? gregorianToJulian(...gregorianTuple(date)) : ymdFromDate(date);
  const key = mmdd(m, d);
  const fixed = fixedFeasts[key] ?? { feasts: [], saints: [] };
  const moveable = moveableFeastsOn(date);
  const feasts: Feast[] = [...moveable, ...fixed.feasts];
  return { feasts, saints: fixed.saints };
}

function gregorianTuple(date: Date): [number, number, number] {
  return [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()];
}

export function highestRank(feasts: Feast[]): Feast['rank'] | null {
  if (feasts.some((f) => f.rank === 'great')) return 'great';
  if (feasts.some((f) => f.rank === 'major')) return 'major';
  if (feasts.some((f) => f.rank === 'minor')) return 'minor';
  return null;
}
