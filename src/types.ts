export type CalendarKind = 'new' | 'old';

export type Lang = 'en' | 'ro';

export type FeastRank = 'great' | 'major' | 'minor';

export interface Feast {
  name: string;
  rank: FeastRank;
  note?: string;
}

export interface Saint {
  name: string;
  title?: string;
  note?: string;
}

export interface DayEntry {
  feasts: Feast[];
  saints: Saint[];
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
