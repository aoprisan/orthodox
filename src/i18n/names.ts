import type { Lang } from '../types';

/**
 * Translations for feast and saint names, keyed by their canonical English
 * form (as used in src/data/fixedFeasts.ts and src/lib/moveableFeasts.ts).
 *
 * Missing entries fall back to English.
 */
const ro: Record<string, string> = {
  // ── Moveable feasts (Triodion / Pentecostarion)
  'Sunday of the Publican and the Pharisee': 'Duminica Vameșului și a Fariseului',
  'Sunday of the Prodigal Son': 'Duminica Fiului Risipitor',
  'Meatfare Sunday — Sunday of the Last Judgment': 'Duminica Lăsatului sec de carne — a Înfricoșatei Judecăți',
  'Forgiveness Sunday — Cheesefare': 'Duminica Iertării — Lăsatul secului de brânză',
  'Clean Monday — Beginning of Great Lent': 'Lunea curată — începutul Postului Mare',
  'Sunday of Orthodoxy': 'Duminica Ortodoxiei',
  'Sunday of St. Gregory Palamas': 'Duminica Sf. Grigorie Palama',
  'Veneration of the Holy Cross': 'Duminica Sf. Cruci',
  'Sunday of St. John Climacus': 'Duminica Sf. Ioan Scărarul',
  'Sunday of St. Mary of Egypt': 'Duminica Sf. Maria Egipteanca',
  'Saturday of Lazarus': 'Sâmbăta lui Lazăr',
  'Palm Sunday — Entry of the Lord into Jerusalem': 'Floriile — Intrarea Domnului în Ierusalim',
  'Holy and Great Monday': 'Sfânta și Marea Luni',
  'Holy and Great Tuesday': 'Sfânta și Marea Marți',
  'Holy and Great Wednesday': 'Sfânta și Marea Miercuri',
  'Holy and Great Thursday': 'Sfânta și Marea Joi',
  'Holy and Great Friday': 'Sfânta și Marea Vineri',
  'Holy and Great Saturday': 'Sfânta și Marea Sâmbătă',
  'Pascha — The Glorious Resurrection of Christ': 'Sfintele Paști — Învierea Domnului',
  'Bright Monday': 'Lunea Luminată',
  'Bright Tuesday': 'Marțea Luminată',
  'Bright Wednesday': 'Miercurea Luminată',
  'Bright Thursday': 'Joia Luminată',
  'Bright Friday — Life-Giving Spring': 'Vinerea Luminată — Izvorul Tămăduirii',
  'Bright Saturday': 'Sâmbăta Luminată',
  'Sunday of St. Thomas — Antipascha': 'Duminica Sf. Toma — a doua după Paști',
  'Sunday of the Myrrhbearing Women': 'Duminica Mironosițelor',
  'Sunday of the Paralytic': 'Duminica Slăbănogului',
  'Mid-Pentecost': 'Înjumătățirea Praznicului',
  'Sunday of the Samaritan Woman': 'Duminica Samarinencei',
  'Sunday of the Blind Man': 'Duminica Orbului',
  'Ascension of the Lord': 'Înălțarea Domnului',
  'Sunday of the Holy Fathers of the First Ecumenical Council':
    'Duminica Sf. Părinți de la Sinodul I Ecumenic',
  'Pentecost — Descent of the Holy Spirit': 'Rusaliile — Pogorârea Sf. Duh',
  'Monday of the Holy Spirit': 'Lunea Sf. Duh',
  'Sunday of All Saints': 'Duminica Tuturor Sfinților',

  // ── Twelve Great Feasts (fixed)
  'Circumcision of Our Lord': 'Tăierea împrejur a Domnului',
  'Theophany — Holy Baptism of the Lord': 'Botezul Domnului — Boboteaza',
  'Synaxis of the Holy and Glorious Prophet, Forerunner, and Baptist John':
    'Soborul Sf. Prooroc Ioan Botezătorul',
  'Meeting of Our Lord in the Temple': 'Întâmpinarea Domnului',
  'Annunciation to the Most Holy Theotokos': 'Buna Vestire',
  'Holy Transfiguration of Our Lord, God, and Savior Jesus Christ':
    'Schimbarea la Față a Domnului',
  'Dormition of Our Most Holy Lady the Theotokos and Ever-Virgin Mary':
    'Adormirea Maicii Domnului',
  'Nativity of Our Most Holy Lady the Theotokos': 'Nașterea Maicii Domnului',
  'Universal Exaltation of the Precious and Life-Giving Cross':
    'Înălțarea Sfintei Cruci',
  'Entry of the Most Holy Theotokos into the Temple':
    'Intrarea în Biserică a Maicii Domnului',
  'Nativity According to the Flesh of Our Lord, God, and Savior Jesus Christ':
    'Nașterea Domnului',

  // ── Other feasts
  'Synaxis of the Three Holy Hierarchs': 'Soborul Sf. Trei Ierarhi',
  'Sts. Constantine and Helen, Equal-to-the-Apostles':
    'Sf. Împărați Constantin și Elena, întocmai cu Apostolii',
  'Nativity of the Holy Forerunner John the Baptist':
    'Nașterea Sf. Ioan Botezătorul',
  'Holy Glorious and All-Praised Leaders of the Apostles, Peter and Paul':
    'Sf. Apostoli Petru și Pavel',
  'Synaxis of the Holy, Glorious, and All-Praised Twelve Apostles':
    'Soborul Sf. 12 Apostoli',
  'Procession of the Precious Cross — Beginning of the Dormition Fast':
    'Scoaterea Sf. Cruci — începutul Postului Adormirii',
  'Beheading of the Holy Forerunner John the Baptist':
    'Tăierea Capului Sf. Ioan Botezătorul',
  'Indiction — Ecclesiastical New Year': 'Începutul Anului Bisericesc',
  'Synaxis of the Holy Righteous Ancestors of God, Joachim and Anna':
    'Sf. Părinți Ioachim și Ana',
  'Repose of the Holy Apostle and Evangelist John the Theologian':
    'Mutarea Sf. Apostol și Evanghelist Ioan Teologul',
  'Synaxis of the Archangel Michael and the other Bodiless Powers':
    'Soborul Sf. Arhangheli Mihail și Gavriil',
  'Beginning of the Nativity Fast': 'Începutul Postului Crăciunului',
  'Conception by St. Anna of the Most Holy Theotokos':
    'Zămislirea Sf. Ana',
  'Synaxis of the Most Holy Theotokos': 'Soborul Maicii Domnului',

  // ── Saints
  'Basil the Great': 'Sf. Vasile cel Mare',
  'Anthony the Great': 'Sf. Antonie cel Mare',
  'Athanasius the Great': 'Sf. Atanasie cel Mare',
  'Cyril': 'Sf. Chiril',
  'Euthymius the Great': 'Sf. Eftimie cel Mare',
  'Gregory the Theologian': 'Sf. Grigorie Teologul',
  'Translation of the Relics of John Chrysostom':
    'Aducerea moaștelor Sf. Ioan Gură de Aur',
  'John Chrysostom': 'Sf. Ioan Gură de Aur',
  'Haralambos': 'Sf. Haralambie',
  'The Forty Holy Martyrs of Sebaste': 'Sf. 40 de Mucenici din Sevasta',
  'George the Great-Martyr': 'Sf. Mare Mucenic Gheorghe',
  'Mark the Apostle and Evangelist': 'Sf. Apostol și Evanghelist Marcu',
  'John the Theologian': 'Sf. Apostol și Evanghelist Ioan Teologul',
  'Marina the Great-Martyr': 'Sf. Mare Muceniță Marina',
  'Elijah the Glorious Prophet': 'Sf. Prooroc Ilie Tesviteanul',
  'Dormition of St. Anna, mother of the Theotokos':
    'Adormirea Sf. Ana, mama Maicii Domnului',
  'Panteleimon the Great-Martyr and Healer':
    'Sf. Mare Mucenic și tămăduitor Pantelimon',
  'The Seven Holy Maccabean Children': 'Cei Șapte Tineri Macabei',
  'Symeon the Stylite': 'Sf. Simeon Stâlpnicul',
  'Luke the Apostle and Evangelist': 'Sf. Apostol și Evanghelist Luca',
  'Demetrios the Great-Martyr, the Myrrh-streaming':
    'Sf. Mare Mucenic Dimitrie, Izvorâtorul de Mir',
  'Philip the Apostle': 'Sf. Apostol Filip',
  'Matthew the Apostle and Evangelist':
    'Sf. Apostol și Evanghelist Matei',
  'Catherine the Great-Martyr of Alexandria':
    'Sf. Mare Muceniță Ecaterina',
  'Andrew the First-Called Apostle': 'Sf. Apostol Andrei, cel întâi chemat',
  'Barbara the Great-Martyr': 'Sf. Mare Muceniță Varvara',
  'Nicholas the Wonderworker': 'Sf. Ierarh Nicolae, făcătorul de minuni',
  'Spyridon the Wonderworker': 'Sf. Ierarh Spiridon, făcătorul de minuni',
  'Eleftherios the Hieromartyr': 'Sf. sfințit Mucenic Eleftherie',
  'Stephen the Protomartyr and Archdeacon':
    'Sf. Întâi Mucenic și Arhidiacon Ștefan',
};

const nameDicts: Record<Lang, Record<string, string>> = {
  en: {},
  ro,
};

export function translateName(name: string, lang: Lang): string {
  if (lang === 'en') return name;
  return nameDicts[lang][name] ?? name;
}
