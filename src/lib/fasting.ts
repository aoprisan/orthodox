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
      return { level: 'fast-free', reason: 'Bright Week' };
    }
    if (sameDay(d, m.pascha)) {
      return { level: 'fast-free', reason: 'Pascha' };
    }

    if (inRange(m.holyMonday, m.holySaturday)) {
      if (sameDay(d, m.holyThursday)) {
        return { level: 'wine-oil', reason: 'Holy Thursday' };
      }
      return { level: 'strict', reason: 'Holy Week' };
    }

    if (sameDay(d, m.palmSunday)) {
      return { level: 'fish', reason: 'Palm Sunday' };
    }
    if (sameDay(d, m.lazarusSaturday)) {
      return { level: 'wine-oil', reason: 'Lazarus Saturday' };
    }

    const greatLentEnd = addDays(m.lazarusSaturday, -1);
    if (inRange(m.cleanMonday, greatLentEnd)) {
      const annunciationCivil = liturgicalDate(year, 3, 25, kind);
      if (sameDay(d, annunciationCivil)) {
        return { level: 'fish', reason: 'Annunciation' };
      }
      if (dow === 0 || dow === 6) {
        return { level: 'wine-oil', reason: 'Great Lent — Saturday/Sunday' };
      }
      return { level: 'strict', reason: 'Great Lent' };
    }

    const cheesefareWeekStart = addDays(m.cheesefare, -6);
    if (inRange(cheesefareWeekStart, m.cheesefare)) {
      return { level: 'dairy', reason: 'Cheesefare Week — no meat, dairy permitted' };
    }

    const ppWeekEnd = addDays(m.triodionStart, 6);
    if (inRange(m.triodionStart, ppWeekEnd) && (dow === 3 || dow === 5)) {
      return { level: 'fast-free', reason: 'Week of the Publican & Pharisee' };
    }

    const afterPentecostEnd = addDays(m.pentecost, 6);
    if (inRange(m.pentecost, afterPentecostEnd)) {
      return { level: 'fast-free', reason: 'Week after Pentecost' };
    }

    // Pentecostarion (Thomas Sunday → eve of Pentecost): Wed/Fri = fish; otherwise fast-free
    const pentecostarionEnd = addDays(m.pentecost, -1);
    if (inRange(m.thomasSunday, pentecostarionEnd)) {
      if (dow === 3 || dow === 5) {
        return { level: 'fish', reason: 'Pentecostarion — Wed/Fri' };
      }
      return { level: 'fast-free', reason: 'Pentecostarion' };
    }

    const apostlesEnd = liturgicalDate(y, 6, 28, kind);
    if (
      d.getTime() >= startOfDayUTC(m.apostlesFastStart).getTime() &&
      d.getTime() <= apostlesEnd.getTime()
    ) {
      if (dow === 3 || dow === 5) return { level: 'strict', reason: "Apostles' Fast — Wed/Fri" };
      if (dow === 1) return { level: 'wine-oil', reason: "Apostles' Fast — Monday" };
      return { level: 'fish', reason: "Apostles' Fast" };
    }
  }

  const lit = liturgicalYMD(d, kind);

  if (
    (lit.m === 12 && lit.d >= 25) ||
    (lit.m === 1 && lit.d <= 4)
  ) {
    return { level: 'fast-free', reason: 'Twelve Days of Christmas' };
  }
  if (lit.m === 1 && lit.d === 5) {
    return { level: 'strict', reason: 'Eve of Theophany' };
  }

  if (lit.m === 8 && lit.d === 29) {
    return { level: 'strict', reason: 'Beheading of the Forerunner — strict fast' };
  }
  if (lit.m === 9 && lit.d === 14) {
    return { level: 'strict', reason: 'Exaltation of the Cross — strict fast' };
  }

  if (lit.m === 8 && lit.d >= 1 && lit.d <= 14) {
    if (lit.d === 6) return { level: 'fish', reason: 'Transfiguration — fish permitted' };
    if (dow === 3 || dow === 5) return { level: 'strict', reason: 'Dormition Fast — Wed/Fri' };
    if (dow === 0 || dow === 6) return { level: 'wine-oil', reason: 'Dormition Fast — Sat/Sun' };
    return { level: 'strict', reason: 'Dormition Fast' };
  }

  const inNativityFast =
    (lit.m === 11 && lit.d >= 15) || (lit.m === 12 && lit.d <= 24);
  if (inNativityFast) {
    const stricter = lit.m === 12 && lit.d >= 20;
    if (lit.m === 11 && lit.d === 21) {
      return { level: 'fish', reason: 'Entry of the Theotokos — fish permitted' };
    }
    if (dow === 3 || dow === 5) {
      return { level: stricter ? 'strict' : 'wine-oil', reason: 'Nativity Fast — Wed/Fri' };
    }
    if (stricter) {
      if (dow === 0 || dow === 6) return { level: 'wine-oil', reason: 'Nativity Forefeast — Sat/Sun' };
      return { level: 'wine-oil', reason: 'Nativity Forefeast' };
    }
    return { level: 'fish', reason: 'Nativity Fast' };
  }

  // Great Feasts that override the weekly Wed/Fri fast (those not already
  // handled by a surrounding fasting window). Fish is permitted.
  const greatFeastFish: Array<[number, number, string]> = [
    [1, 6, 'Theophany'],
    [2, 2, 'Meeting of the Lord'],
    [3, 25, 'Annunciation'],
    [8, 15, 'Dormition of the Theotokos'],
    [9, 8, 'Nativity of the Theotokos'],
  ];
  for (const [fm, fd, label] of greatFeastFish) {
    if (lit.m === fm && lit.d === fd) {
      return { level: 'fish', reason: `${label} — fish permitted` };
    }
  }

  if (dow === 3) return { level: 'strict', reason: 'Wednesday — weekly fast' };
  if (dow === 5) return { level: 'strict', reason: 'Friday — weekly fast' };

  return { level: 'fast-free', reason: 'Fast-free' };
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
