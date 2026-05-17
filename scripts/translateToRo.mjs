// Template-based EN→RO translator for OCA synaxarion entries.
//
// Not a general-purpose translator. It targets the narrow grammar of
// Orthodox synaxarion titles — a liturgical role prefix, a proper name,
// optional epithet, "of/at <place>", and an optional century/role
// clause after a comma. For each piece we know how to translate, we do;
// the rest passes through. This won't produce idiomatic Romanian for
// every entry, but it removes virtually all English liturgical-role
// words from the RO view, which is what mattered to the reader.

const ROLE_PREFIX = {
  // Direct mappings from OCA `feast_type`.
  Saint: 'Sf.',
  Hierarch: 'Sf. Ier.',
  Venerable: 'Sf. Cuv.',
  Martyr: 'Sf. Mc.',
  Hieromartyr: 'Sf. sfințit Mc.',
  Apostle: 'Sf. Ap.',
  Prophet: 'Sf. Prooroc',
  Confessor: 'Sf. Mărturisitorul',
};

// Refinements: a "Saint" who is also a bishop is a Sf. Ier. in Romanian
// liturgical use. Similarly for "Saint" + Apostle, etc.
function refinePrefix(feastType, title) {
  if (feastType === 'Saint') {
    if (/\b(Bishop|Archbishop|Patriarch|Metropolitan|Pope)\b/.test(title)) return 'Sf. Ier.';
    if (/\bApostle\b/.test(title)) return 'Sf. Ap.';
    if (/\bRighteous\b/.test(title)) return 'Sf. și Drept';
    if (/\bEmpress\b/.test(title)) return 'Sf. Împărăteasa';
    if (/\bEmperor\b/.test(title)) return 'Sf. Împărat';
    if (/\b(Great Prince|Prince)\b/.test(title)) return 'Sf. Voievod';
  }
  if (feastType === 'Martyr') {
    if (/\bNew Martyr\b|\bNew Hieromartyr\b/.test(title)) return 'Sf. Nou Mc.';
    if (/\bGreat[- ]Martyr\b|\bGreat Martyr\b/.test(title)) return 'Sf. M. Mc.';
    if (/\bMonastic Martyr\b/.test(title)) return 'Sf. Cuv. Mc.';
    if (/\bVirgin[- ]?Martyr\b/.test(title)) return 'Sf. Muceniță';
  }
  if (feastType === 'Hieromartyr') {
    if (/\bNew Hieromartyr\b/.test(title)) return 'Sf. Nou sfințit Mc.';
  }
  return ROLE_PREFIX[feastType] || 'Sf.';
}

// Saint forenames most common in the synaxarion. Romanian Orthodox usage
// often Romanizes Greek/Latin forms — Basil→Vasile, John→Ioan, etc.
const NAMES = {
  Anthony: 'Antonie', Athanasius: 'Atanasie', Andrew: 'Andrei', Anna: 'Ana',
  Anastasia: 'Anastasia', Anastasius: 'Anastasie', Aquila: 'Acvila',
  Ambrose: 'Ambrozie', Apollonius: 'Apolonie', Arsenius: 'Arsenie',
  Aristarchus: 'Aristarh', Augustine: 'Augustin',
  Barbara: 'Varvara', Basil: 'Vasile', Bartholomew: 'Vartolomeu',
  Benedict: 'Benedict', Bessarion: 'Visarion',
  Callistus: 'Calist', Catherine: 'Ecaterina', Charalambos: 'Haralambie',
  Charalampus: 'Haralambie', Christopher: 'Hristofor', Clement: 'Clement',
  Constantine: 'Constantin', Cosmas: 'Cosma', Cyprian: 'Ciprian',
  Cyril: 'Chiril', Cyrillus: 'Chiril',
  Damascene: 'Damaschin', Daniel: 'Daniil', David: 'David',
  Demetrius: 'Dimitrie', Dionysius: 'Dionisie', Dometian: 'Dometian',
  Dorotheus: 'Dorotei',
  Elijah: 'Ilie', Elias: 'Ilie', Elizabeth: 'Elisabeta', Emilia: 'Emilia',
  Emilian: 'Emilian', Ephrem: 'Efrem', Epiphanius: 'Epifanie',
  Euphemia: 'Eufimia', Eustathius: 'Eustatie', Euthymius: 'Eftimie',
  Felicitas: 'Felicitas', Flavian: 'Flavian',
  Gabriel: 'Gavriil', Genevieve: 'Genoveva', George: 'Gheorghe',
  Gerasimos: 'Gherasim', Gerasimus: 'Gherasim', Gerasim: 'Gherasim',
  Glykeria: 'Glicheria', Gordius: 'Gordie', Gregory: 'Grigorie',
  Helena: 'Elena', Helen: 'Elena', Hermes: 'Hermes', Hilarion: 'Ilarion',
  Hyacinth: 'Iachint',
  Ignatius: 'Ignatie', Innocent: 'Inochentie', Irene: 'Irina',
  Irenaeus: 'Irineu', Isaac: 'Isaac', Isidore: 'Isidor', Iuliana: 'Iuliana',
  James: 'Iacob', Jeremiah: 'Ieremia', Joachim: 'Ioachim', Joel: 'Ioil',
  John: 'Ioan', Jonah: 'Iona', Joseph: 'Iosif', Joshua: 'Iosua',
  Jude: 'Iuda', Julian: 'Iulian', Juliana: 'Iuliana', Justin: 'Iustin',
  Kalliope: 'Caliopia', Kalliopios: 'Caliopie', Kerykos: 'Chiric',
  Lawrence: 'Lavrentie', Lazarus: 'Lazăr', Leo: 'Leon', Leontios: 'Leontie',
  Leontius: 'Leontie', Luke: 'Luca', Lydia: 'Lidia',
  Macarius: 'Macarie', Marcian: 'Marcian', Marina: 'Marina', Mark: 'Marcu',
  Martha: 'Marta', Mary: 'Maria', Matrona: 'Matrona', Matthew: 'Matei',
  Matthias: 'Matia', Maximus: 'Maxim', Melania: 'Melania', Meletius: 'Meletie',
  Methodius: 'Metodie', Michael: 'Mihail', Modestus: 'Modest',
  Naum: 'Naum', Nahum: 'Naum', Nectarius: 'Nectarie', Nicander: 'Nicandru',
  Nicephorus: 'Nichifor', Nicholas: 'Nicolae', Nicodemus: 'Nicodim',
  Nikodemos: 'Nicodim', Nilus: 'Nil',
  Olympias: 'Olimpiada', Onesimus: 'Onisim', Onuphrius: 'Onufrie',
  Pachomius: 'Pahomie', Panteleimon: 'Pantelimon', Paraskeve: 'Parascheva',
  Patapius: 'Patapie', Paul: 'Pavel', Pelagia: 'Pelaghia', Peter: 'Petru',
  Philip: 'Filip', Phoebe: 'Fivi', Photius: 'Fotie', Photeini: 'Fotini',
  Polycarp: 'Policarp', Porphyrius: 'Porfirie', Procopius: 'Procopie',
  Pulcheria: 'Pulheria',
  Quiricus: 'Chiric',
  Romanos: 'Roman', Romanus: 'Roman',
  Sampson: 'Samson', Sava: 'Sava', Sabbas: 'Sava', Sebastian: 'Sebastian',
  Seraphim: 'Serafim', Sergius: 'Serghie', Silas: 'Sila',
  Silvester: 'Silvestru', Sylvester: 'Silvestru', Simeon: 'Simeon',
  Sophia: 'Sofia', Sophronius: 'Sofronie', Stephen: 'Ștefan',
  Symeon: 'Simeon', Synkletika: 'Sinclitichia',
  Tatiana: 'Tatiana', Telemakhos: 'Telemah', Tertius: 'Terțiu',
  Thaddeus: 'Tadeu', Theodora: 'Teodora', Theodore: 'Teodor',
  Theodosius: 'Teodosie', Theodulia: 'Teodulia', Theognostus: 'Teognost',
  Theogonios: 'Teogonie', Theophanes: 'Teofan', Theophilus: 'Teofil',
  Thomas: 'Toma', Timothy: 'Timotei', Titus: 'Tit', Tryphon: 'Trifon',
  Vladimir: 'Vladimir',
  Xenia: 'Xenia',
  Zacharias: 'Zaharia', Zechariah: 'Zaharia', Zoe: 'Zoe', Zosimus: 'Zosima',
};

// Common places. Most pass through; these are the high-frequency ones.
const PLACES = {
  Alexandria: 'Alexandria', Ancyra: 'Ancira', Antioch: 'Antiohia',
  Armenia: 'Armenia', Asia: 'Asia', Athens: 'Atena', Athos: 'Athos',
  Byzantium: 'Bizanț',
  Cappadocia: 'Capadocia', Caesarea: 'Cezareea', Catania: 'Catania',
  Cherson: 'Cherson', Cilicia: 'Cilicia', Constantinople: 'Constantinopol',
  Crete: 'Creta', Cyprus: 'Cipru', Cyzicus: 'Cizic',
  Damascus: 'Damasc', Decapolis: 'Decapole',
  Edessa: 'Edesa', Egypt: 'Egipt', Ephesus: 'Efes', Estonia: 'Estonia',
  Galatia: 'Galatia', Gaza: 'Gaza', Georgia: 'Georgia',
  Hellas: 'Elada', Hellespont: 'Hellespont',
  Iberia: 'Iberia', Iconium: 'Iconium', Isauria: 'Isauria',
  Israel: 'Israel', Italy: 'Italia',
  Jerusalem: 'Ierusalim', Jordan: 'Iordan',
  Kiev: 'Kiev',
  Lampsacus: 'Lampsacului', Lavra: 'Lavra',
  Macedonia: 'Macedonia', Magnesia: 'Magnesia', Melitene: 'Melitenei',
  Mesopotamia: 'Mesopotamia', Moscow: 'Moscova', Murom: 'Murom',
  Nicaea: 'Niceea', Nicomedia: 'Nicomidia', Nineveh: 'Ninive',
  Nisibis: 'Nisibe', Novgorod: 'Novgorod',
  Palestine: 'Palestina', Paris: 'Paris', Persia: 'Persia',
  Phrygia: 'Frigia', Pisidia: 'Pisidia', Pontus: 'Pont',
  Rome: 'Roma', Rus: 'Rus', Russia: 'Rusia',
  Sarov: 'Sarov', Sebaste: 'Sevastia', Serbia: 'Serbia', Sicily: 'Sicilia',
  Sinai: 'Sinai', Smolensk: 'Smolensk', Smyrna: 'Smirna', Spain: 'Spania',
  Syria: 'Siria',
  Tarsus: 'Tars', Thebes: 'Teba', Thessaloniki: 'Tesalonic',
  Thrace: 'Tracia', Tiberias: 'Tiberiada',
  Vatopedi: 'Vatopedi',
  Yuriev: 'Yuriev',
};

// Strip prefix tokens we'll re-emit from the role; also strip filler.
const STRIPPED_PREFIXES = [
  'Our', 'and God-bearing', 'God-bearing', 'and All-Glorious', 'All-Glorious',
  'Holy and Glorious', 'Holy and Right-Victorious',
  'Holy', 'Right-Victorious', 'Glorious', 'Blessed', 'Pious',
  'Father', 'Mother', 'Saint', 'St.', 'Sts.', 'Saints',
  'Venerable', 'Righteous', 'Equal-to-the-Apostles', 'Equal of the Apostles',
  'Confessor', 'Forerunner and Baptist', 'Forerunner',
  'Holy Prophet', 'Prophet', 'Apostle', 'Apostles',
  'Great Martyr', 'Great-Martyr', 'Greatmartyr',
  'New Martyr', 'New Hieromartyr', 'Monastic Martyr', 'Virgin Martyr',
  'Virgin-Martyr', 'Martyr', 'Martyrs', 'Hieromartyr', 'Hierarch', 'Hierarchs',
  'Emperor', 'Empress', 'Great Prince', 'Prince', 'Princess', 'King', 'Queen',
  'Repose of', 'Repose of the', 'Repose',
  'Translation of the Relics of', 'Translation of', 'Synaxis of the',
  'Synaxis of', 'Veneration of the', 'Veneration of',
  'Discovery of the Relics of the Holy', 'Discovery of', 'Finding of the',
  'Finding of',
  'the Great', 'the New', 'the Elder', 'the Younger', 'the Wonderworker',
  'the Confessor', 'the Stylite', 'the Recluse', 'the Hermit', 'the Theologian',
];

// Connective / filler English words that survive after prefix stripping.
// Translate them so the residue reads as Romanian.
const FILLER_WORDS = {
  and: 'și',
  or: 'sau',
  his: 'său',
  her: 'sa',
  their: 'lor',
  the: '',
  with: 'cu',
  who: 'care',
  was: 'a fost',
  on: 'din',
  by: 'de',
  for: 'pentru',
  Mother: 'mama',
  mother: 'mama',
  Father: 'tatăl',
  father: 'tatăl',
  Daughter: 'fiica',
  daughter: 'fiica',
  Son: 'fiul',
  son: 'fiul',
  Sister: 'sora',
  sister: 'sora',
  Brother: 'fratele',
  brother: 'fratele',
  Companions: 'tovarășii',
  companions: 'tovarășii',
  Disciple: 'ucenicul',
  disciple: 'ucenicul',
  Disciples: 'ucenicii',
  disciples: 'ucenicii',
  Teacher: 'învățătorul',
  teacher: 'învățătorul',
  Bishop: 'episcop',
  Wonderworker: 'Făcătorul de Minuni',
  Recluse: 'Zăvorâtul',
  Hermit: 'Sihastrul',
  Founder: 'întemeietorul',
  Monasticism: 'monahismului',
  Discovery: 'aflarea',
  Finding: 'aflarea',
  Skete: 'Schitul',
  Schemamonk: 'Schimonahul',
  Schemanun: 'Schimonahia',
  Mount: 'Muntele',
  Stylite: 'Stâlpnicul',
  Stylites: 'Stâlpnicul',
  Monastery: 'Mănăstirea',
  Deacon: 'Diaconul',
  Deaconess: 'Diaconița',
  Priest: 'Preotul',
  Priestmonk: 'Ieromonahul',
  Hieromonk: 'Ieromonahul',
  Nun: 'Călugărița',
  Sister: 'sora',
  sisters: 'surorile',
  Sisters: 'surorile',
  brothers: 'frații',
  Brothers: 'Frații',
  Women: 'Femei',
  Men: 'Bărbați',
  Forty: '40',
  Fifty: '50',
  Hundred: '100',
  Thousand: '1000',
  Far: 'Îndepărtate',
  Near: 'Apropiate',
  Caves: 'Peșterilor',
  Cave: 'Peșterii',
};

// Patterns where the whole entry is rendered with a full Romanian template,
// bypassing prefix logic. Order matters — first match wins.
const FULL_TEMPLATES = [
  [/^Icon of the (Most )?Holy (Mother of God|Theotokos)\b\s*(.*)/i,
    (_, _m, _t, rest) => `Cinstirea Sf. Icoane a Maicii Domnului ${rest}`.trim()],
  [/^Icon of the (Mother of God|Theotokos)\b\s*(.*)/i,
    (_, _m, rest) => `Cinstirea Sf. Icoane a Maicii Domnului ${rest}`.trim()],
  [/^([“"][^”"]+[”"]) Icon of the (Mother of God|Theotokos)\b\s*(.*)/i,
    (_, q, _t, rest) => `Cinstirea Sf. Icoane a Maicii Domnului ${q} ${rest}`.trim()],
  [/^Synaxis of (the |all the )?(.*)/i, (_, _q, rest) => `Soborul ${rest}`],
  [/^Translation of the Relics of (.*)/i, (_, rest) => `Mutarea moaștelor ${rest}`],
  [/^Veneration of the (.*)/i, (_, rest) => `Cinstirea ${rest}`],
  [/^Finding of the (.*)/i, (_, rest) => `Aflarea ${rest}`],
  [/^Discovery of the Relics of the Holy (.*)/i, (_, rest) => `Aflarea moaștelor ${rest}`],
  [/^Repose of (Venerable )?(.*)/i, (_, _v, rest) => `Adormirea Sf. ${rest}`],
];

const EPITHET_MAP = {
  'the Great': 'cel Mare',
  'the New': 'cel Nou',
  'the Elder': 'cel Bătrân',
  'the Younger': 'cel Tânăr',
  'the Wonderworker': 'Făcătorul de Minuni',
  'the Confessor': 'Mărturisitorul',
  'the Theologian': 'Teologul',
  'the Stylite': 'Stâlpnicul',
  'the Recluse': 'Zăvorâtul',
  'the Hermit': 'Sihastrul',
  'the Syrian': 'Sirul',
  'the Egyptian': 'Egipteanul',
  'the Persian': 'Persul',
  'the Sinaite': 'Sinaitul',
  'the Cappadocian': 'Capadocianul',
  'the Athonite': 'Athonitul',
  'Mother of God': 'Maicii Domnului',
  'Icon of the Mother of God': 'Cinstirea Sf. Icoane a Maicii Domnului',
  'Icon of the Theotokos': 'Cinstirea Sf. Icoane a Maicii Domnului',
};

function translateName(s) {
  let out = s;
  // Compound epithets first (longest first).
  for (const [en, ro] of Object.entries(EPITHET_MAP).sort((a, b) => b[0].length - a[0].length)) {
    out = out.replaceAll(en, ro);
  }
  // Drop "the", "Saint"/"St."/"Sts.", "Holy", "Venerable" anywhere in the
  // string FIRST — they otherwise interfere with "of <Capital>" patterns
  // ("of the Kiev Caves", "of Saint Anne Skete"). Done globally, not just
  // at the head. Same for "Martyr(s)" / "Hieromartyr(s)" appearing inline
  // ("…and Martyr Theonas") since the role is already in the prefix.
  out = out.replace(
    /\b(the|Saint|St\.|Sts\.|Saints|Holy|Venerable|Martyr|Martyrs|Hieromartyr|Hieromartyrs)\b\s*/g,
    '',
  );
  // Bishop / Archbishop / Patriarch / Pope of <Place>
  out = out.replace(/\bPatriarch of ([A-Z][A-Za-z]*)\b/g, (_, p) => `Patriarhul ${PLACES[p] || p}`);
  out = out.replace(/\bArchbishop of ([A-Z][A-Za-z]*)\b/g, (_, p) => `Arhiepiscopul ${PLACES[p] || p}`);
  out = out.replace(/\bMetropolitan of ([A-Z][A-Za-z]*)\b/g, (_, p) => `Mitropolitul ${PLACES[p] || p}`);
  out = out.replace(/\bBishop of ([A-Z][A-Za-z]*)\b/g, (_, p) => `Episcopul ${PLACES[p] || p}`);
  out = out.replace(/\bPope of ([A-Z][A-Za-z]*)\b/g, (_, p) => `Papa al ${PLACES[p] || p}`);
  // "of <Place>" → "din <Place>"; allow up to three capitalized words.
  out = out.replace(/\b(of|at|in|from)\s+([A-Z][A-Za-z]*(?:\s+[A-Z][A-Za-z]*){0,2})/g, (_, _prep, p) => {
    const head = p.split(/\s+/)[0];
    return `din ${PLACES[head] || p}`;
  });
  // Personal names (whole-word, original case).
  for (const [en, ro] of Object.entries(NAMES)) {
    out = out.replace(new RegExp(`\\b${en}\\b`, 'g'), ro);
  }
  // Filler / connective words last so they don't interfere with the
  // bigger phrase patterns above.
  for (const [en, ro] of Object.entries(FILLER_WORDS)) {
    out = out.replace(new RegExp(`\\b${en}\\b`, 'g'), ro);
  }
  // Collapse "din din" / "din și" duplicates that template stacking can produce.
  out = out.replace(/\bdin (din|și|cu) /g, '$1 ');
  return out.replace(/\s+/g, ' ').replace(/\s+,/g, ',').trim();
}

// Entries that aren't really saints — calendrical notes, generic
// commemorations the source flags as "Saint" but that don't deserve a
// "Sf." prefix in Romanian. We pass them through with light translation.
const NON_SAINT_HEADS = [
  /^Church New Year$/i,
  /^Indiction\b/i,
  /^Sunday of\b/i,
];

function isNonSaintEntry(title) {
  return NON_SAINT_HEADS.some((re) => re.test(title.trim()));
}

function stripPrefixes(s) {
  let out = s;
  let changed = true;
  while (changed) {
    changed = false;
    for (const p of STRIPPED_PREFIXES.sort((a, b) => b.length - a.length)) {
      const re = new RegExp(`^${escape(p)}\\s+`, 'i');
      if (re.test(out)) {
        out = out.replace(re, '');
        changed = true;
        break;
      }
    }
  }
  return out;
}

function escape(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function translateEntry(entry) {
  const title = (entry.title || entry.name || '').trim();
  if (!title) return null;
  if (entry.feast_type === 'Great Feast') return null;
  // Some entries aren't really saints (Church New Year, Indiction, …);
  // drop the role prefix and just translate.
  if (isNonSaintEntry(title)) {
    return translateName(title) || null;
  }
  // Some titles get a whole-entry template (Icon of the Mother of God, Synaxis
  // of …, Translation of the Relics of …). These bypass the prefix logic.
  for (const [re, fn] of FULL_TEMPLATES) {
    const m = title.match(re);
    if (m) return translateName(fn(...m)).replace(/\s+/g, ' ').trim();
  }
  // Take only the head clause (before the first comma).
  const head = title.split(',')[0].trim();
  const remainder = title.includes(',') ? title.slice(title.indexOf(',')) : '';
  const prefix = refinePrefix(entry.feast_type, title);
  const headStripped = stripPrefixes(head);
  const translatedHead = translateName(headStripped);
  // Translate the comma-tail too — re-strip prefixes there (the tail often
  // begins with another role marker: "..., Bishop of X" or "..., Mother of Y").
  const tailStripped = remainder ? stripPrefixes(remainder.replace(/^,\s*/, '')) : '';
  const translatedTail = tailStripped ? ', ' + translateName(tailStripped) : '';
  return `${prefix} ${translatedHead}${translatedTail}`.replace(/\s+/g, ' ').trim();
}
