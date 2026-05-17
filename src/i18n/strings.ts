import type { FastLevel, FastReasonCode, Feast, Lang } from '../types';

type Dict = Record<string, string>;

const en: Dict = {
  appTitle: 'Orthodox Calendar',
  appSubtitle: 'Feasts, Saints & the Holy Fasts',
  prevMonth: 'Previous month',
  nextMonth: 'Next month',
  today: 'Today',
  goToToday: 'Go to today',
  newCalendar: 'New Calendar',
  oldCalendar: 'Old Calendar',
  newCalendarTitle: 'Revised Julian Calendar (Greek, Antiochian, OCA, …)',
  oldCalendarTitle: 'Julian Calendar (Russian, Serbian, Jerusalem, Athonite)',
  english: 'English',
  romanian: 'Română',
  feasts: 'Feasts',
  saints: 'Saints',
  noFeast: 'No feast commemorated.',
  noSaints: 'Synaxarion not loaded for this day.',
  todayHeader: 'Today',
  julianPrefix: 'Julian:',
  gregorianPrefix: 'Gregorian:',
  footer:
    'Καλὴ Σαρακοστή · A static calendar; consult your priest for the rule of your parish.',

  // Fast levels (pill text)
  'fast.strict': 'Strict Fast',
  'fast.wine-oil': 'Wine & Oil',
  'fast.fish': 'Fish Permitted',
  'fast.dairy': 'Dairy Permitted',
  'fast.fast-free': 'Fast-Free',

  // Legend
  'legend.strict': 'Strict',
  'legend.wine-oil': 'Wine & Oil',
  'legend.fish': 'Fish',
  'legend.dairy': 'Dairy',
  'legend.fast-free': 'Fast-free',

  // Feast ranks
  'rank.great': 'Great Feast',
  'rank.major': 'Major Feast',
  'rank.minor': 'Commemoration',

  // Fast reasons (engine codes)
  'reason.brightWeek': 'Bright Week',
  'reason.pascha': 'Pascha',
  'reason.holyWeek': 'Holy Week',
  'reason.holyThursday': 'Holy Thursday',
  'reason.palmSunday': 'Palm Sunday',
  'reason.lazarusSaturday': 'Lazarus Saturday',
  'reason.annunciation': 'Annunciation',
  'reason.greatLentSatSun': 'Great Lent — Saturday/Sunday',
  'reason.greatLent': 'Great Lent',
  'reason.cheesefareWeek': 'Cheesefare Week — no meat, dairy permitted',
  'reason.publicanPharisee': 'Week of the Publican & Pharisee',
  'reason.weekAfterPentecost': 'Week after Pentecost',
  'reason.pentecostarionWedFri': 'Pentecostarion — Wed/Fri',
  'reason.pentecostarion': 'Pentecostarion',
  'reason.apostlesFastWedFri': "Apostles' Fast — Wed/Fri",
  'reason.apostlesFastMonday': "Apostles' Fast — Monday",
  'reason.apostlesFast': "Apostles' Fast",
  'reason.twelveDays': 'Twelve Days of Christmas',
  'reason.eveOfTheophany': 'Eve of Theophany',
  'reason.beheadingForerunner': 'Beheading of the Forerunner',
  'reason.exaltationCross': 'Exaltation of the Cross',
  'reason.transfigurationFish': 'Transfiguration — fish permitted',
  'reason.dormitionFastWedFri': 'Dormition Fast — Wed/Fri',
  'reason.dormitionFastSatSun': 'Dormition Fast — Sat/Sun',
  'reason.dormitionFast': 'Dormition Fast',
  'reason.entryTheotokosFish': 'Entry of the Theotokos — fish permitted',
  'reason.nativityFastWedFri': 'Nativity Fast — Wed/Fri',
  'reason.nativityForefeastSatSun': 'Nativity Forefeast — Sat/Sun',
  'reason.nativityForefeast': 'Nativity Forefeast',
  'reason.nativityFast': 'Nativity Fast',
  'reason.theophanyFish': 'Theophany — fish permitted',
  'reason.meetingFish': 'Meeting of the Lord — fish permitted',
  'reason.dormitionFish': 'Dormition of the Theotokos — fish permitted',
  'reason.nativityTheotokosFish': 'Nativity of the Theotokos — fish permitted',
  'reason.wednesdayFast': 'Wednesday — weekly fast',
  'reason.fridayFast': 'Friday — weekly fast',
  'reason.fastFree': 'Fast-free',
};

const ro: Dict = {
  appTitle: 'Calendar Ortodox',
  appSubtitle: 'Sărbători, sfinți și posturile',
  prevMonth: 'Luna anterioară',
  nextMonth: 'Luna următoare',
  today: 'Astăzi',
  goToToday: 'Mergi la ziua de azi',
  newCalendar: 'Stil nou',
  oldCalendar: 'Stil vechi',
  newCalendarTitle: 'Calendar îndreptat (grecesc, român, antiohian)',
  oldCalendarTitle: 'Calendar pe stil vechi (rus, sârb, ierusalimitean, athonit)',
  english: 'English',
  romanian: 'Română',
  feasts: 'Sărbători',
  saints: 'Sfinți',
  noFeast: 'Nu este sărbătoare astăzi.',
  noSaints: 'Sinaxarul nu este încărcat pentru această zi.',
  todayHeader: 'Astăzi',
  julianPrefix: 'Iulian:',
  gregorianPrefix: 'Gregorian:',
  footer:
    'Post cu folos · Acest calendar este orientativ; consultați duhovnicul pentru rânduiala parohiei.',

  'fast.strict': 'Post aspru',
  'fast.wine-oil': 'Dezlegare la vin și untdelemn',
  'fast.fish': 'Dezlegare la pește',
  'fast.dairy': 'Dezlegare la lactate',
  'fast.fast-free': 'Harți',

  'legend.strict': 'Aspru',
  'legend.wine-oil': 'Vin & untdelemn',
  'legend.fish': 'Pește',
  'legend.dairy': 'Lactate',
  'legend.fast-free': 'Harți',

  'rank.great': 'Praznic Împărătesc',
  'rank.major': 'Sărbătoare mare',
  'rank.minor': 'Pomenire',

  'reason.brightWeek': 'Săptămâna Luminată',
  'reason.pascha': 'Sfintele Paști',
  'reason.holyWeek': 'Săptămâna Patimilor',
  'reason.holyThursday': 'Joia Mare',
  'reason.palmSunday': 'Floriile',
  'reason.lazarusSaturday': 'Sâmbăta lui Lazăr',
  'reason.annunciation': 'Buna Vestire',
  'reason.greatLentSatSun': 'Postul Mare — sâmbătă/duminică',
  'reason.greatLent': 'Postul Mare',
  'reason.cheesefareWeek': 'Săptămâna brânzei — fără carne, lactate permise',
  'reason.publicanPharisee': 'Săptămâna Vameșului și Fariseului',
  'reason.weekAfterPentecost': 'Săptămâna după Rusalii',
  'reason.pentecostarionWedFri': 'Penticostar — miercuri/vineri',
  'reason.pentecostarion': 'Penticostar',
  'reason.apostlesFastWedFri': 'Postul Sfinților Apostoli — miercuri/vineri',
  'reason.apostlesFastMonday': 'Postul Sfinților Apostoli — luni',
  'reason.apostlesFast': 'Postul Sfinților Apostoli',
  'reason.twelveDays': 'Cele douăsprezece zile ale Crăciunului',
  'reason.eveOfTheophany': 'Ajunul Bobotezei',
  'reason.beheadingForerunner': 'Tăierea Capului Sf. Ioan Botezătorul',
  'reason.exaltationCross': 'Înălțarea Sfintei Cruci',
  'reason.transfigurationFish': 'Schimbarea la Față — dezlegare la pește',
  'reason.dormitionFastWedFri': 'Postul Adormirii — miercuri/vineri',
  'reason.dormitionFastSatSun': 'Postul Adormirii — sâmbătă/duminică',
  'reason.dormitionFast': 'Postul Adormirii Maicii Domnului',
  'reason.entryTheotokosFish': 'Intrarea Maicii Domnului — dezlegare la pește',
  'reason.nativityFastWedFri': 'Postul Crăciunului — miercuri/vineri',
  'reason.nativityForefeastSatSun': 'Înaintea Crăciunului — sâmbătă/duminică',
  'reason.nativityForefeast': 'Înaintea Crăciunului',
  'reason.nativityFast': 'Postul Crăciunului',
  'reason.theophanyFish': 'Botezul Domnului — dezlegare la pește',
  'reason.meetingFish': 'Întâmpinarea Domnului — dezlegare la pește',
  'reason.dormitionFish': 'Adormirea Maicii Domnului — dezlegare la pește',
  'reason.nativityTheotokosFish': 'Nașterea Maicii Domnului — dezlegare la pește',
  'reason.wednesdayFast': 'Miercuri — post de peste an',
  'reason.fridayFast': 'Vineri — post de peste an',
  'reason.fastFree': 'Harți (fără post)',
};

const dicts: Record<Lang, Dict> = { en, ro };

export function t(key: string, lang: Lang): string {
  return dicts[lang][key] ?? dicts.en[key] ?? key;
}

export function tFastLevel(level: FastLevel, lang: Lang): string {
  return t(`fast.${level}`, lang);
}

export function tLegendLevel(level: FastLevel, lang: Lang): string {
  return t(`legend.${level}`, lang);
}

export function tFastReason(code: FastReasonCode, lang: Lang): string {
  return t(`reason.${code}`, lang);
}

export function tRank(rank: Feast['rank'], lang: Lang): string {
  return t(`rank.${rank}`, lang);
}

export function locale(lang: Lang): string {
  return lang === 'ro' ? 'ro-RO' : 'en-US';
}
