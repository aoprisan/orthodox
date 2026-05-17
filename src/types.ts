export type CalendarKind = 'new' | 'old';

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

export interface FastInfo {
  level: FastLevel;
  reason: string;
}

export interface YMD {
  y: number;
  m: number;
  d: number;
}
