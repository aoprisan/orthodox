import type { CalendarKind, FastInfo } from '../types';
import {
  addDays,
  dateFromYMD,
  gregorianToJulian,
  julianToGregorian,
  sameDay,
  startOfDayUTC,
  ymdFromDate,
} from './julian';
import { moveableFeasts } from './moveableFeasts';

/**
 * Returns the fast status for a civil date under either calendar.
 *
 * Fixed-date fasting periods (Apostles', Dormition, Nativity) are anchored
 * to the liturgical calendar — so for the Old Calendar we evaluate them
 * against the Julian date corresponding to the civil day. The moveable
 * cycle (Triodion → Pentecostarion) is the same civil date for both
 * calendars because Pascha is a single liturgical event.
 */
export function fastFor(date: Date, kind: CalendarKind): FastInfo {
  const d = startOfDayUTC(date);
  const year = d.getUTCFullYear();
  const dow = d.getUTCDay();

  for (const y of [year, year - 1, year + 1]) {
    const m = moveableFeasts(y);
    const inRange = (start: Date, end: Date) =>
      d.getTime() >= startOfDayUTC(start).getTime() &&
      d.getTime() <= startOfDayUTC(end).getTime();

    if (inRange(m.brightMonday, m.brightSaturday)) {
      return { level: 'fast-free', code: 'brightWeek' };
    }
    if (sameDay(d, m.pascha)) {
      return { level: 'fast-free', code: 'pascha' };
    }

    if (inRange(m.holyMonday, m.holySaturday)) {
      if (sameDay(d, m.holyThursday)) {
        return { level: 'wine-oil', code: 'holyThursday' };
      }
      return { level: 'strict', code: 'holyWeek' };
    }

    if (sameDay(d, m.palmSunday)) {
      return { level: 'fish', code: 'palmSunday' };
    }
    if (sameDay(d, m.lazarusSaturday)) {
      return { level: 'wine-oil', code: 'lazarusSaturday' };
    }

    const greatLentEnd = addDays(m.lazarusSaturday, -1);
    if (inRange(m.cleanMonday, greatLentEnd)) {
      const annunciationCivil = liturgicalDate(year, 3, 25, kind);
      if (sameDay(d, annunciationCivil)) {
        return { level: 'fish', code: 'annunciation' };
      }
      if (dow === 0 || dow === 6) {
        return { level: 'wine-oil', code: 'greatLentSatSun' };
      }
      return { level: 'strict', code: 'greatLent' };
    }

    const cheesefareWeekStart = addDays(m.cheesefare, -6);
    if (inRange(cheesefareWeekStart, m.cheesefare)) {
      return { level: 'dairy', code: 'cheesefareWeek' };
    }

    const ppWeekEnd = addDays(m.triodionStart, 6);
    if (inRange(m.triodionStart, ppWeekEnd) && (dow === 3 || dow === 5)) {
      return { level: 'fast-free', code: 'publicanPharisee' };
    }

    const afterPentecostEnd = addDays(m.pentecost, 6);
    if (inRange(m.pentecost, afterPentecostEnd)) {
      return { level: 'fast-free', code: 'weekAfterPentecost' };
    }

    const pentecostarionEnd = addDays(m.pentecost, -1);
    if (inRange(m.thomasSunday, pentecostarionEnd)) {
      if (dow === 3 || dow === 5) {
        return { level: 'fish', code: 'pentecostarionWedFri' };
      }
      return { level: 'fast-free', code: 'pentecostarion' };
    }

    const apostlesEnd = liturgicalDate(y, 6, 28, kind);
    if (
      d.getTime() >= startOfDayUTC(m.apostlesFastStart).getTime() &&
      d.getTime() <= apostlesEnd.getTime()
    ) {
      if (dow === 3 || dow === 5) return { level: 'strict', code: 'apostlesFastWedFri' };
      if (dow === 1) return { level: 'wine-oil', code: 'apostlesFastMonday' };
      return { level: 'fish', code: 'apostlesFast' };
    }
  }

  const lit = liturgicalYMD(d, kind);

  if (
    (lit.m === 12 && lit.d >= 25) ||
    (lit.m === 1 && lit.d <= 4)
  ) {
    return { level: 'fast-free', code: 'twelveDays' };
  }
  if (lit.m === 1 && lit.d === 5) {
    return { level: 'strict', code: 'eveOfTheophany' };
  }

  if (lit.m === 8 && lit.d === 29) {
    return { level: 'strict', code: 'beheadingForerunner' };
  }
  if (lit.m === 9 && lit.d === 14) {
    return { level: 'strict', code: 'exaltationCross' };
  }

  if (lit.m === 8 && lit.d >= 1 && lit.d <= 14) {
    if (lit.d === 6) return { level: 'fish', code: 'transfigurationFish' };
    if (dow === 3 || dow === 5) return { level: 'strict', code: 'dormitionFastWedFri' };
    if (dow === 0 || dow === 6) return { level: 'wine-oil', code: 'dormitionFastSatSun' };
    return { level: 'strict', code: 'dormitionFast' };
  }

  const inNativityFast =
    (lit.m === 11 && lit.d >= 15) || (lit.m === 12 && lit.d <= 24);
  if (inNativityFast) {
    const stricter = lit.m === 12 && lit.d >= 20;
    if (lit.m === 11 && lit.d === 21) {
      return { level: 'fish', code: 'entryTheotokosFish' };
    }
    if (dow === 3 || dow === 5) {
      return { level: stricter ? 'strict' : 'wine-oil', code: 'nativityFastWedFri' };
    }
    if (stricter) {
      if (dow === 0 || dow === 6) return { level: 'wine-oil', code: 'nativityForefeastSatSun' };
      return { level: 'wine-oil', code: 'nativityForefeast' };
    }
    return { level: 'fish', code: 'nativityFast' };
  }

  const greatFeastFish: Array<[number, number, FastInfo['code']]> = [
    [1, 6, 'theophanyFish'],
    [2, 2, 'meetingFish'],
    [3, 25, 'annunciation'],
    [8, 15, 'dormitionFish'],
    [9, 8, 'nativityTheotokosFish'],
  ];
  for (const [fm, fd, code] of greatFeastFish) {
    if (lit.m === fm && lit.d === fd) {
      return { level: 'fish', code };
    }
  }

  if (dow === 3) return { level: 'strict', code: 'wednesdayFast' };
  if (dow === 5) return { level: 'strict', code: 'fridayFast' };

  return { level: 'fast-free', code: 'fastFree' };
}

function liturgicalDate(year: number, m: number, d: number, kind: CalendarKind): Date {
  if (kind === 'new') {
    return startOfDayUTC(new Date(Date.UTC(year, m - 1, d)));
  }
  const g = julianToGregorian(year, m, d);
  return startOfDayUTC(dateFromYMD(g));
}

function liturgicalYMD(d: Date, kind: CalendarKind): { y: number; m: number; d: number } {
  if (kind === 'new') {
    return ymdFromDate(d);
  }
  const { y, m: mm, d: dd } = ymdFromDate(d);
  return gregorianToJulian(y, mm, dd);
}
