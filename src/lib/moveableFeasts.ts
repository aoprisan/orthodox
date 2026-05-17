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
    { name: { en: 'Sunday of the Publican and the Pharisee', ro: 'Duminica Vameșului și a Fariseului' }, rank: 'minor', date: m.triodionStart },
    { name: { en: 'Sunday of the Prodigal Son', ro: 'Duminica Fiului Risipitor' }, rank: 'minor', date: m.prodigalSon },
    { name: { en: 'Meatfare Sunday — Sunday of the Last Judgment', ro: 'Duminica Lăsatului sec de carne — a Înfricoșatei Judecăți' }, rank: 'minor', date: m.meatfare },
    { name: { en: 'Forgiveness Sunday — Cheesefare', ro: 'Duminica Iertării — Lăsatul secului de brânză' }, rank: 'major', date: m.cheesefare },
    { name: { en: 'Clean Monday — Beginning of Great Lent', ro: 'Lunea curată — începutul Postului Mare' }, rank: 'major', date: m.cleanMonday },
    { name: { en: 'Sunday of Orthodoxy', ro: 'Duminica Ortodoxiei' }, rank: 'major', date: m.sundayOfOrthodoxy },
    { name: { en: 'Sunday of St. Gregory Palamas', ro: 'Duminica Sf. Grigorie Palama' }, rank: 'minor', date: m.stGregoryPalamas },
    { name: { en: 'Veneration of the Holy Cross', ro: 'Duminica Sf. Cruci' }, rank: 'major', date: m.veneration },
    { name: { en: 'Sunday of St. John Climacus', ro: 'Duminica Sf. Ioan Scărarul' }, rank: 'minor', date: m.stJohnClimacus },
    { name: { en: 'Sunday of St. Mary of Egypt', ro: 'Duminica Sf. Maria Egipteanca' }, rank: 'minor', date: m.stMaryOfEgypt },
    { name: { en: 'Saturday of Lazarus', ro: 'Sâmbăta lui Lazăr' }, rank: 'major', date: m.lazarusSaturday },
    { name: { en: 'Palm Sunday — Entry of the Lord into Jerusalem', ro: 'Floriile — Intrarea Domnului în Ierusalim' }, rank: 'great', date: m.palmSunday },
    { name: { en: 'Holy and Great Monday', ro: 'Sfânta și Marea Luni' }, rank: 'major', date: m.holyMonday },
    { name: { en: 'Holy and Great Tuesday', ro: 'Sfânta și Marea Marți' }, rank: 'major', date: m.holyTuesday },
    { name: { en: 'Holy and Great Wednesday', ro: 'Sfânta și Marea Miercuri' }, rank: 'major', date: m.holyWednesday },
    { name: { en: 'Holy and Great Thursday', ro: 'Sfânta și Marea Joi' }, rank: 'major', date: m.holyThursday },
    { name: { en: 'Holy and Great Friday', ro: 'Sfânta și Marea Vineri' }, rank: 'major', date: m.holyFriday },
    { name: { en: 'Holy and Great Saturday', ro: 'Sfânta și Marea Sâmbătă' }, rank: 'major', date: m.holySaturday },
    { name: { en: 'Pascha — The Glorious Resurrection of Christ', ro: 'Sfintele Paști — Învierea Domnului' }, rank: 'great', date: m.pascha },
    { name: { en: 'Bright Monday', ro: 'Lunea Luminată' }, rank: 'minor', date: m.brightMonday },
    { name: { en: 'Bright Tuesday', ro: 'Marțea Luminată' }, rank: 'minor', date: m.brightTuesday },
    { name: { en: 'Bright Wednesday', ro: 'Miercurea Luminată' }, rank: 'minor', date: m.brightWednesday },
    { name: { en: 'Bright Thursday', ro: 'Joia Luminată' }, rank: 'minor', date: m.brightThursday },
    { name: { en: 'Bright Friday — Life-Giving Spring', ro: 'Vinerea Luminată — Izvorul Tămăduirii' }, rank: 'major', date: m.brightFriday },
    { name: { en: 'Bright Saturday', ro: 'Sâmbăta Luminată' }, rank: 'minor', date: m.brightSaturday },
    { name: { en: 'Sunday of St. Thomas — Antipascha', ro: 'Duminica Sf. Toma — a doua după Paști' }, rank: 'major', date: m.thomasSunday },
    { name: { en: 'Sunday of the Myrrhbearing Women', ro: 'Duminica Mironosițelor' }, rank: 'minor', date: m.myrrhbearers },
    { name: { en: 'Sunday of the Paralytic', ro: 'Duminica Slăbănogului' }, rank: 'minor', date: m.paralytic },
    { name: { en: 'Mid-Pentecost', ro: 'Înjumătățirea Praznicului' }, rank: 'minor', date: m.midPentecost },
    { name: { en: 'Sunday of the Samaritan Woman', ro: 'Duminica Samarinencei' }, rank: 'minor', date: m.samaritan },
    { name: { en: 'Sunday of the Blind Man', ro: 'Duminica Orbului' }, rank: 'minor', date: m.blindMan },
    { name: { en: 'Ascension of the Lord', ro: 'Înălțarea Domnului' }, rank: 'great', date: m.ascension },
    { name: { en: 'Sunday of the Holy Fathers of the First Ecumenical Council', ro: 'Duminica Sf. Părinți de la Sinodul I Ecumenic' }, rank: 'minor', date: m.fathersFirstCouncil },
    { name: { en: 'Pentecost — Descent of the Holy Spirit', ro: 'Rusaliile — Pogorârea Sf. Duh' }, rank: 'great', date: m.pentecost },
    { name: { en: 'Monday of the Holy Spirit', ro: 'Lunea Sf. Duh' }, rank: 'major', date: m.holySpirit },
    { name: { en: 'Sunday of All Saints', ro: 'Duminica Tuturor Sfinților' }, rank: 'major', date: m.allSaints },
  ];
}
