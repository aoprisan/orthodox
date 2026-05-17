import { julianToGregorian, julianToJDN, dateFromYMD } from './julian';

/**
 * Orthodox Pascha — Meeus's Julian algorithm. Returns the date in the
 * Julian calendar; convert to Gregorian for civil display.
 */
export function paschaJulian(year: number): { y: number; m: number; d: number } {
  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const month = Math.floor((d + e + 114) / 31);
  const day = ((d + e + 114) % 31) + 1;
  return { y: year, m: month, d: day };
}

export function paschaGregorian(year: number): Date {
  const j = paschaJulian(year);
  const g = julianToGregorian(j.y, j.m, j.d);
  return dateFromYMD(g);
}

export function paschaJDN(year: number): number {
  const j = paschaJulian(year);
  return julianToJDN(j.y, j.m, j.d);
}
