export type CalendarKind = 'new' | 'old';

export type Lang = 'en' | 'ro';

export type Localized = string | { en: string; ro?: string };

export type FeastRank = 'great' | 'major' | 'minor';

export interface Feast {
  name: Localized;
  rank: FeastRank;
  note?: Localized;
  /**
   * A short, hand-authored explainer of what the celebration commemorates
   * (a few sentences). Set only on the principal feasts — the Twelve Great
   * Feasts and the great moveable feasts (Pascha, Palm Sunday, Ascension,
   * Pentecost). Rendered as a collapsible "About this feast" note in the day
   * panel; absent on the rank-and-file commemorations.
   */
  about?: Localized;
}

export interface Saint {
  name: Localized;
  title?: Localized;
  note?: Localized;
  /**
   * Set on entries pulled from the extended (lesser-commemorations)
   * synaxarion at lookup time. The principal saints of the day, hand-curated
   * in `fixedFeasts.ts`, leave this unset; the UI uses the flag to render
   * secondary commemorations with reduced visual weight.
   */
  secondary?: boolean;
}

export interface DayEntry {
  feasts: Feast[];
  saints: Saint[];
}

export type ServiceCode =
  | 'vigil'
  | 'vespers'
  | 'orthros'
  | 'liturgy'
  | 'presanctified';

export interface ServiceTime {
  code: ServiceCode;
  /** Local clock time as "HH:MM" (24h); formatted for the active locale at render. */
  time: string;
}

/**
 * One saint or feast section within a day's hagiographic reading. Title is
 * the commemoration line (e.g., "Tot în această zi, pomenirea ..."), and
 * paragraphs are the lives-of-saints prose. anchor is the source-page
 * fragment id so attribution can deep-link the exact section.
 */
export interface SaintSection {
  title: string;
  paragraphs: string[];
  anchor?: string;
}

/**
 * The bundle of saint sections for a single day, lazy-loaded from
 * /public/lives/{MM}.json. Built from calendar-ortodox.ro pages by
 * scripts/buildSynaxarLives.mjs.
 */
export interface DayLives {
  sections: SaintSection[];
  closing?: string;
  sourceUrl: string;
}

export type FastLevel =
  | 'strict'
  | 'wine-oil'
  | 'fish'
  | 'dairy'
  | 'fast-free';

export type FastReasonCode =
  | 'brightWeek'
  | 'pascha'
  | 'holyWeek'
  | 'holyThursday'
  | 'palmSunday'
  | 'lazarusSaturday'
  | 'annunciation'
  | 'greatLentSatSun'
  | 'greatLent'
  | 'cheesefareWeek'
  | 'publicanPharisee'
  | 'weekAfterPentecost'
  | 'pentecostarionWedFri'
  | 'pentecostarion'
  | 'apostlesFastWedFri'
  | 'apostlesFastMonday'
  | 'apostlesFast'
  | 'twelveDays'
  | 'eveOfTheophany'
  | 'beheadingForerunner'
  | 'exaltationCross'
  | 'transfigurationFish'
  | 'dormitionFastWedFri'
  | 'dormitionFastSatSun'
  | 'dormitionFast'
  | 'entryTheotokosFish'
  | 'nativityFastWedFri'
  | 'nativityForefeastSatSun'
  | 'nativityForefeast'
  | 'nativityFast'
  | 'theophanyFish'
  | 'meetingFish'
  | 'dormitionFish'
  | 'nativityTheotokosFish'
  | 'wednesdayFast'
  | 'fridayFast'
  | 'fastFree';

export interface FastInfo {
  level: FastLevel;
  code: FastReasonCode;
}

export interface YMD {
  y: number;
  m: number;
  d: number;
}
