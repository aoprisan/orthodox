import type { CalendarKind, ServiceTime } from '../types';
import { entryForDate, highestRank } from './feasts';
import { fastFor } from './fasting';
import { addDays, startOfDayUTC } from './julian';

/**
 * A *typical* parish service schedule for a civil day, derived from the day of
 * week and the rank of the day's feast, plus the Great Lent rule for the
 * Liturgy of the Presanctified Gifts. Exact clock times vary by parish, so the
 * UI shows these with a "confirm with your parish" notice.
 *
 * Services that physically fall on the calendar day are listed — including the
 * evening Vespers/Vigil that anticipates the next liturgical day, since the
 * liturgical day begins at sunset. Morning services come first, then evening,
 * each in the order served.
 */
export function servicesFor(date: Date, kind: CalendarKind): ServiceTime[] {
  const d = startOfDayUTC(date);
  const dow = d.getUTCDay();
  const rank = highestRank(entryForDate(d, kind).feasts);
  // fastFor returns 'greatLent' only on the weekdays (Mon–Fri) of Great Lent,
  // when no full Liturgy is served; Sat/Sun carry the 'greatLentSatSun' code.
  const lentWeekday = fastFor(d, kind).code === 'greatLent';

  const services: ServiceTime[] = [];

  // ── Morning ──────────────────────────────────────────────────────
  // The full Divine Liturgy is served on Sundays, Saturdays, and great/major
  // feast days — but never on a Great Lent weekday.
  if (!lentWeekday && (dow === 0 || dow === 6 || rank === 'great' || rank === 'major')) {
    const sunday = dow === 0;
    services.push({ code: 'orthros', time: sunday ? '08:30' : '08:00' });
    services.push({ code: 'liturgy', time: sunday ? '10:00' : '09:30' });
  }

  // ── Evening ──────────────────────────────────────────────────────
  if (lentWeekday && (dow === 3 || dow === 5)) {
    // Liturgy of the Presanctified Gifts — Wednesdays & Fridays of Great Lent.
    services.push({ code: 'presanctified', time: '17:00' });
  } else {
    // Vespers/Vigil anticipating the next liturgical day.
    const next = addDays(d, 1);
    const nextRank = highestRank(entryForDate(next, kind).feasts);
    if (next.getUTCDay() === 0 || nextRank === 'great') {
      services.push({ code: 'vigil', time: '18:00' });
    } else if (nextRank === 'major') {
      services.push({ code: 'vespers', time: '18:00' });
    }
  }

  return services;
}
