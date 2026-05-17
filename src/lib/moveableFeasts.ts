import { addDays, sameDay } from './julian';
import { paschaGregorian } from './pascha';
import type { Feast } from '../types';

export interface MoveableFeastMap {
  pascha: Date;
  triodionStart: Date;       // Sunday of Publican & Pharisee (Pascha − 70)
  prodigalSon: Date;         // Pascha − 63
  meatfare: Date;            // Pascha − 56
  cheesefare: Date;          // Forgiveness Sunday, Pascha − 49
  cleanMonday: Date;         // Pascha − 48
  sundayOfOrthodoxy: Date;   // Pascha − 42
  stGregoryPalamas: Date;    // Pascha − 35
  veneration: Date;          // Pascha − 28 (Cross)
  stJohnClimacus: Date;      // Pascha − 21
  stMaryOfEgypt: Date;       // Pascha − 14
  lazarusSaturday: Date;     // Pascha − 8
  palmSunday: Date;          // Pascha − 7
  holyMonday: Date;
  holyTuesday: Date;
  holyWednesday: Date;
  holyThursday: Date;
  holyFriday: Date;
  holySaturday: Date;
  brightMonday: Date;
  brightTuesday: Date;
  brightWednesday: Date;
  brightThursday: Date;
  brightFriday: Date;
  brightSaturday: Date;
  thomasSunday: Date;        // Pascha + 7
  myrrhbearers: Date;        // Pascha + 14
  paralytic: Date;           // Pascha + 21
  midPentecost: Date;        // Pascha + 24
  samaritan: Date;           // Pascha + 28
  blindMan: Date;            // Pascha + 35
  ascension: Date;           // Pascha + 39
  fathersFirstCouncil: Date; // Pascha + 42
  pentecost: Date;           // Pascha + 49
  holySpirit: Date;          // Pascha + 50
  allSaints: Date;           // Pascha + 56
  apostlesFastStart: Date;   // Monday after All Saints = Pascha + 57
}

export function moveableFeasts(year: number): MoveableFeastMap {
  const pascha = paschaGregorian(year);
  return {
    pascha,
    triodionStart: addDays(pascha, -70),
    prodigalSon: addDays(pascha, -63),
    meatfare: addDays(pascha, -56),
    cheesefare: addDays(pascha, -49),
    cleanMonday: addDays(pascha, -48),
    sundayOfOrthodoxy: addDays(pascha, -42),
    stGregoryPalamas: addDays(pascha, -35),
    veneration: addDays(pascha, -28),
    stJohnClimacus: addDays(pascha, -21),
    stMaryOfEgypt: addDays(pascha, -14),
    lazarusSaturday: addDays(pascha, -8),
    palmSunday: addDays(pascha, -7),
    holyMonday: addDays(pascha, -6),
    holyTuesday: addDays(pascha, -5),
    holyWednesday: addDays(pascha, -4),
    holyThursday: addDays(pascha, -3),
    holyFriday: addDays(pascha, -2),
    holySaturday: addDays(pascha, -1),
    brightMonday: addDays(pascha, 1),
    brightTuesday: addDays(pascha, 2),
    brightWednesday: addDays(pascha, 3),
    brightThursday: addDays(pascha, 4),
    brightFriday: addDays(pascha, 5),
    brightSaturday: addDays(pascha, 6),
    thomasSunday: addDays(pascha, 7),
    myrrhbearers: addDays(pascha, 14),
    paralytic: addDays(pascha, 21),
    midPentecost: addDays(pascha, 24),
    samaritan: addDays(pascha, 28),
    blindMan: addDays(pascha, 35),
    ascension: addDays(pascha, 39),
    fathersFirstCouncil: addDays(pascha, 42),
    pentecost: addDays(pascha, 49),
    holySpirit: addDays(pascha, 50),
    allSaints: addDays(pascha, 56),
    apostlesFastStart: addDays(pascha, 57),
  };
}

interface NamedFeast extends Feast {
  date: Date;
}

export function moveableFeastsOn(date: Date): Feast[] {
  const year = date.getUTCFullYear();
  const candidates = [
    ...buildList(moveableFeasts(year)),
    ...buildList(moveableFeasts(year - 1)),
    ...buildList(moveableFeasts(year + 1)),
  ];
  return candidates.filter((f) => sameDay(f.date, date)).map(({ date: _d, ...rest }) => rest);
}

function buildList(m: MoveableFeastMap): NamedFeast[] {
  return [
    { name: 'Sunday of the Publican and the Pharisee', rank: 'minor', date: m.triodionStart },
    { name: 'Sunday of the Prodigal Son', rank: 'minor', date: m.prodigalSon },
    { name: 'Meatfare Sunday — Sunday of the Last Judgment', rank: 'minor', date: m.meatfare },
    { name: 'Forgiveness Sunday — Cheesefare', rank: 'minor', date: m.cheesefare },
    { name: 'Clean Monday — Beginning of Great Lent', rank: 'major', date: m.cleanMonday },
    { name: 'Sunday of Orthodoxy', rank: 'major', date: m.sundayOfOrthodoxy },
    { name: 'Sunday of St. Gregory Palamas', rank: 'minor', date: m.stGregoryPalamas },
    { name: 'Veneration of the Holy Cross', rank: 'major', date: m.veneration },
    { name: 'Sunday of St. John Climacus', rank: 'minor', date: m.stJohnClimacus },
    { name: 'Sunday of St. Mary of Egypt', rank: 'minor', date: m.stMaryOfEgypt },
    { name: 'Saturday of Lazarus', rank: 'major', date: m.lazarusSaturday },
    { name: 'Palm Sunday — Entry of the Lord into Jerusalem', rank: 'great', date: m.palmSunday },
    { name: 'Holy and Great Monday', rank: 'major', date: m.holyMonday },
    { name: 'Holy and Great Tuesday', rank: 'major', date: m.holyTuesday },
    { name: 'Holy and Great Wednesday', rank: 'major', date: m.holyWednesday },
    { name: 'Holy and Great Thursday', rank: 'major', date: m.holyThursday },
    { name: 'Holy and Great Friday', rank: 'major', date: m.holyFriday },
    { name: 'Holy and Great Saturday', rank: 'major', date: m.holySaturday },
    { name: 'Pascha — The Glorious Resurrection of Christ', rank: 'great', date: m.pascha },
    { name: 'Bright Monday', rank: 'minor', date: m.brightMonday },
    { name: 'Bright Tuesday', rank: 'minor', date: m.brightTuesday },
    { name: 'Bright Wednesday', rank: 'minor', date: m.brightWednesday },
    { name: 'Bright Thursday', rank: 'minor', date: m.brightThursday },
    { name: 'Bright Friday — Life-Giving Spring', rank: 'minor', date: m.brightFriday },
    { name: 'Bright Saturday', rank: 'minor', date: m.brightSaturday },
    { name: 'Sunday of St. Thomas — Antipascha', rank: 'major', date: m.thomasSunday },
    { name: 'Sunday of the Myrrhbearing Women', rank: 'minor', date: m.myrrhbearers },
    { name: 'Sunday of the Paralytic', rank: 'minor', date: m.paralytic },
    { name: 'Mid-Pentecost', rank: 'minor', date: m.midPentecost },
    { name: 'Sunday of the Samaritan Woman', rank: 'minor', date: m.samaritan },
    { name: 'Sunday of the Blind Man', rank: 'minor', date: m.blindMan },
    { name: 'Ascension of the Lord', rank: 'great', date: m.ascension },
    { name: 'Sunday of the Holy Fathers of the First Ecumenical Council', rank: 'minor', date: m.fathersFirstCouncil },
    { name: 'Pentecost — Descent of the Holy Spirit', rank: 'great', date: m.pentecost },
    { name: 'Monday of the Holy Spirit', rank: 'major', date: m.holySpirit },
    { name: 'Sunday of All Saints', rank: 'major', date: m.allSaints },
  ];
}
