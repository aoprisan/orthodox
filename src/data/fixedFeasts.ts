import type { DayEntry } from '../types';
import { mmdd } from '../lib/julian';

/**
 * Keyed by canonical "MM-DD" of the Orthodox liturgical date. The same key
 * is interpreted under either calendar at render time — toggling Old/New
 * shifts the civil date but the underlying commemoration is unchanged.
 *
 * v1: Twelve Great Feasts (fixed) + most-commemorated saints. Expandable
 * by simply appending entries to this map.
 */
export const fixedFeasts: Record<string, DayEntry> = {
  // ── January
  [mmdd(1, 1)]: {
    feasts: [{ name: 'Circumcision of Our Lord', rank: 'major' }],
    saints: [{ name: 'Basil the Great', title: 'Archbishop of Caesarea' }],
  },
  [mmdd(1, 6)]: {
    feasts: [{ name: 'Theophany — Holy Baptism of the Lord', rank: 'great' }],
    saints: [],
  },
  [mmdd(1, 7)]: {
    feasts: [{ name: 'Synaxis of the Holy and Glorious Prophet, Forerunner, and Baptist John', rank: 'major' }],
    saints: [],
  },
  [mmdd(1, 17)]: {
    feasts: [],
    saints: [{ name: 'Anthony the Great', title: 'Father of Monasticism' }],
  },
  [mmdd(1, 18)]: {
    feasts: [],
    saints: [
      { name: 'Athanasius the Great', title: 'Patriarch of Alexandria' },
      { name: 'Cyril', title: 'Patriarch of Alexandria' },
    ],
  },
  [mmdd(1, 20)]: {
    feasts: [],
    saints: [{ name: 'Euthymius the Great' }],
  },
  [mmdd(1, 25)]: {
    feasts: [],
    saints: [{ name: 'Gregory the Theologian', title: 'Archbishop of Constantinople' }],
  },
  [mmdd(1, 27)]: {
    feasts: [],
    saints: [{ name: 'Translation of the Relics of John Chrysostom' }],
  },
  [mmdd(1, 30)]: {
    feasts: [{ name: 'Synaxis of the Three Holy Hierarchs', rank: 'major' }],
    saints: [
      { name: 'Basil the Great' },
      { name: 'Gregory the Theologian' },
      { name: 'John Chrysostom' },
    ],
  },

  // ── February
  [mmdd(2, 2)]: {
    feasts: [{ name: 'Meeting of Our Lord in the Temple', rank: 'great' }],
    saints: [],
  },
  [mmdd(2, 10)]: {
    feasts: [],
    saints: [{ name: 'Haralambos', title: 'Hieromartyr' }],
  },

  // ── March
  [mmdd(3, 9)]: {
    feasts: [],
    saints: [{ name: 'The Forty Holy Martyrs of Sebaste' }],
  },
  [mmdd(3, 25)]: {
    feasts: [{ name: 'Annunciation to the Most Holy Theotokos', rank: 'great' }],
    saints: [],
  },

  // ── April
  [mmdd(4, 23)]: {
    feasts: [],
    saints: [{ name: 'George the Great-Martyr', title: 'the Trophy-bearer' }],
  },
  [mmdd(4, 25)]: {
    feasts: [],
    saints: [{ name: 'Mark the Apostle and Evangelist' }],
  },

  // ── May
  [mmdd(5, 8)]: {
    feasts: [],
    saints: [{ name: 'John the Theologian', title: 'Apostle and Evangelist' }],
  },
  [mmdd(5, 21)]: {
    feasts: [{ name: 'Sts. Constantine and Helen, Equal-to-the-Apostles', rank: 'major' }],
    saints: [],
  },

  // ── June
  [mmdd(6, 24)]: {
    feasts: [{ name: 'Nativity of the Holy Forerunner John the Baptist', rank: 'major' }],
    saints: [],
  },
  [mmdd(6, 29)]: {
    feasts: [{ name: 'Holy Glorious and All-Praised Leaders of the Apostles, Peter and Paul', rank: 'major' }],
    saints: [],
  },
  [mmdd(6, 30)]: {
    feasts: [{ name: 'Synaxis of the Holy, Glorious, and All-Praised Twelve Apostles', rank: 'major' }],
    saints: [],
  },

  // ── July
  [mmdd(7, 17)]: {
    feasts: [],
    saints: [{ name: 'Marina the Great-Martyr' }],
  },
  [mmdd(7, 20)]: {
    feasts: [],
    saints: [{ name: 'Elijah the Glorious Prophet' }],
  },
  [mmdd(7, 25)]: {
    feasts: [],
    saints: [{ name: 'Dormition of St. Anna, mother of the Theotokos' }],
  },
  [mmdd(7, 27)]: {
    feasts: [],
    saints: [{ name: 'Panteleimon the Great-Martyr and Healer' }],
  },

  // ── August
  [mmdd(8, 1)]: {
    feasts: [{ name: 'Procession of the Precious Cross — Beginning of the Dormition Fast', rank: 'minor' }],
    saints: [{ name: 'The Seven Holy Maccabean Children' }],
  },
  [mmdd(8, 6)]: {
    feasts: [{ name: 'Holy Transfiguration of Our Lord, God, and Savior Jesus Christ', rank: 'great' }],
    saints: [],
  },
  [mmdd(8, 15)]: {
    feasts: [{ name: 'Dormition of Our Most Holy Lady the Theotokos and Ever-Virgin Mary', rank: 'great' }],
    saints: [],
  },
  [mmdd(8, 29)]: {
    feasts: [{ name: 'Beheading of the Holy Forerunner John the Baptist', rank: 'major' }],
    saints: [],
  },

  // ── September
  [mmdd(9, 1)]: {
    feasts: [{ name: 'Indiction — Ecclesiastical New Year', rank: 'minor' }],
    saints: [{ name: 'Symeon the Stylite' }],
  },
  [mmdd(9, 8)]: {
    feasts: [{ name: 'Nativity of Our Most Holy Lady the Theotokos', rank: 'great' }],
    saints: [],
  },
  [mmdd(9, 9)]: {
    feasts: [{ name: 'Synaxis of the Holy Righteous Ancestors of God, Joachim and Anna', rank: 'major' }],
    saints: [],
  },
  [mmdd(9, 14)]: {
    feasts: [{ name: 'Universal Exaltation of the Precious and Life-Giving Cross', rank: 'great' }],
    saints: [],
  },
  [mmdd(9, 26)]: {
    feasts: [{ name: 'Repose of the Holy Apostle and Evangelist John the Theologian', rank: 'major' }],
    saints: [],
  },

  // ── October
  [mmdd(10, 18)]: {
    feasts: [],
    saints: [{ name: 'Luke the Apostle and Evangelist' }],
  },
  [mmdd(10, 26)]: {
    feasts: [],
    saints: [{ name: 'Demetrios the Great-Martyr, the Myrrh-streaming' }],
  },

  // ── November
  [mmdd(11, 8)]: {
    feasts: [{ name: 'Synaxis of the Archangel Michael and the other Bodiless Powers', rank: 'major' }],
    saints: [],
  },
  [mmdd(11, 13)]: {
    feasts: [],
    saints: [{ name: 'John Chrysostom', title: 'Archbishop of Constantinople' }],
  },
  [mmdd(11, 14)]: {
    feasts: [],
    saints: [{ name: 'Philip the Apostle' }],
    // Note: the eve of the Nativity Fast (begins next day in OC reckoning).
  },
  [mmdd(11, 15)]: {
    feasts: [{ name: 'Beginning of the Nativity Fast', rank: 'minor' }],
    saints: [],
  },
  [mmdd(11, 16)]: {
    feasts: [],
    saints: [{ name: 'Matthew the Apostle and Evangelist' }],
  },
  [mmdd(11, 21)]: {
    feasts: [{ name: 'Entry of the Most Holy Theotokos into the Temple', rank: 'great' }],
    saints: [],
  },
  [mmdd(11, 25)]: {
    feasts: [],
    saints: [{ name: 'Catherine the Great-Martyr of Alexandria' }],
  },
  [mmdd(11, 30)]: {
    feasts: [],
    saints: [{ name: 'Andrew the First-Called Apostle' }],
  },

  // ── December
  [mmdd(12, 4)]: {
    feasts: [],
    saints: [{ name: 'Barbara the Great-Martyr' }],
  },
  [mmdd(12, 6)]: {
    feasts: [],
    saints: [{ name: 'Nicholas the Wonderworker', title: 'Archbishop of Myra in Lycia' }],
  },
  [mmdd(12, 9)]: {
    feasts: [{ name: 'Conception by St. Anna of the Most Holy Theotokos', rank: 'major' }],
    saints: [],
  },
  [mmdd(12, 12)]: {
    feasts: [],
    saints: [{ name: 'Spyridon the Wonderworker', title: 'Bishop of Trimythous' }],
  },
  [mmdd(12, 15)]: {
    feasts: [],
    saints: [{ name: 'Eleftherios the Hieromartyr' }],
  },
  [mmdd(12, 25)]: {
    feasts: [{ name: 'Nativity According to the Flesh of Our Lord, God, and Savior Jesus Christ', rank: 'great' }],
    saints: [],
  },
  [mmdd(12, 26)]: {
    feasts: [{ name: 'Synaxis of the Most Holy Theotokos', rank: 'major' }],
    saints: [],
  },
  [mmdd(12, 27)]: {
    feasts: [],
    saints: [{ name: 'Stephen the Protomartyr and Archdeacon' }],
  },
};
