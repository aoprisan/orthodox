// Turns a calendar-ortodox.ro commemoration title (the prose `subtitlu`
// line captured in public/lives/*.json) into a short Romanian saint name:
//   "Tot în această zi, pomenirea preacuviosului părintelui nostru
//    Antonie cel Nou, ... care a sihăstrit în schitul Veria ..."
//      → "Sf. Cuv. Antonie cel Nou"
//
// Returns null for entries that aren't stand-alone saint commemorations
// (principal Great Feasts — those live in fixedFeasts.ts feasts[]).
//
// Diacritics: most pages carry full Romanian diacritics, a few are stripped
// or mojibaked (ã for ă). Every fold below is a 1:1 character swap, so a
// folded copy keeps the original indices — we match on the fold and slice
// the original, preserving whatever diacritics the source had.

const FOLD = {
  'ă': 'a', 'â': 'a', 'î': 'i', 'ș': 's', 'ş': 's', 'ț': 't', 'ţ': 't',
  'ã': 'a', 'õ': 'o', 'ñ': 'n', 'ḑ': 'd', 'é': 'e', 'è': 'e',
};
const FOLD_RE = new RegExp('[' + Object.keys(FOLD).join('') + ']', 'g');
function fold(s) {
  return s.toLowerCase().replace(FOLD_RE, (c) => FOLD[c]);
}

// First "lead verb" — everything before and including it is preamble noise
// (date phrasing). Robust to every ordinal-day variant.
const LEAD = /\b(pomenir(ea|ca)|se\s+praznuieste|se\s+savarsesc|se\s+face\s+(pomenirea|praznuire)|amintirea|cinstim|praznuieste|praznuim|praznuirea|asezar(ea|ii))\b\s*/;
// Filler that can follow the lead verb before the actual name.
const POST_LEAD = /^(nevoin[t]ei|suirii(\s+la\s+cer)?(\s+cea\s+de\s+foc\s+purtatoare)?|patimirii|adormirii(\s+intru\s+domnul)?(\s+a)?\b|innoir(ile|ea|ii))\s+/;

// Great Feasts & feast-cycle days → skip (these belong in fixedFeasts[].feasts).
// No trailing \b: the stems must match inflected forms ("bunavestire",
// "adormirea", "praznicului").
const FEAST_WORDS = /\b(aratare|dumnezeiasca\s+aratare|nasterea\s+(domnului|maicii|preasfintei)|nasteri[ie]\s+(cinstitului|cinstitei|sf)|botezul\s+domnului|intampinar|buna\s*vestir|buneivestir|schimbarea\s+la\s+fata|inaltarea\s+(sfintei\s+cruci|domnului)|adormire\w*\s+(a\s+)?(maicii|preasfintei|preamarit|stapanei|nascatoarei)|intrarea\s+(maicii|in\s+biseric)|invierea\s+domnului|pogorarea\s+sf[a]ntului\s+duh|taierea\s+imprejur|acoperamant|inainte\s*-?\s*praznuir|odovani|lasatul|praznicul\w*\s+(preasfintei|nascatoare|maicii))/;
// The page-closing prayer occasionally lands in a section head — never a saint.
const CLOSING = /^\s*cu\s+ale\b.{0,80}?\brugaciuni\b/;
// A fallback body that opens with one of these is an orphaned clause from the
// prose, not a commemoration — drop it rather than print "Pomenirea care …".
const CLAUSE_START = /^(care|caruia|careia|carora|cel\s+ce|cei\s+ce|cea\s+ce|ceea|fiind|dupa\s+ce|in\s+anul|s-a\b|s-au\b|si\s+care|iar\b|insa\b|asadar)/;

// A sentence-ending period, but NOT the century abbreviation "sec." which
// sits inside the name itself ("(sec. V)", "(sec. al IV-lea)", "(sec. V-VI)").
// Without this guard, "Sf. Vincentiu de Lerins (sec. V)." would be cut at
// "(sec", and likewise for David cel din Tesalonic, Petru și Fevronia, etc.
const SENTENCE_END = /(?<!\bsec)\.(\s|$)/;

// Bio-clause markers — cut the name here.
const BIO = [
  /\bcare\b/, /\bsi\s+care\b/, /\bdespre\s+care\b/, /\bc[a]ruia\b/, /\bc[a]reia\b/, /\bc[a]rora\b/,
  /\bcel\s+ce\b/, /\bcei\s+ce\b/, /\bceea\s+ce\b/, /\bcea\s+ce\b/,
  /,\s*numit\b/, /,\s*supranumit\b/, /,\s*poreclit\b/, /,\s*zis\b/,
];

// Role-genitive/nominative root → short prefix. Longest / most specific first.
// `\w*` after a stem absorbs the gen/nom ending (-ul/-ului/-ei/-ilor/-i).
// Glory epithets ("slăvitului", "măritului", "prealăudatului", "pururea
// pomenitului") that pad a role phrase but aren't part of the name.
const GLORY = '(?:(?:si\\s+)?(?:slavit|marit|preal\\w+|laudat|pururea|prea)\\w*\\s+)*';
const ROLES = [
  [new RegExp(`^sf\\w+\\s+${GLORY}mar(ilor|i|elui|ii|ei)\\s+mucenic\\w*`), 'Sf. M. Mc.'],
  [new RegExp(`^sf\\w+\\s+${GLORY}mucenic\\w+`), 'Sf. Mc.'],
  [/^sf\w+\s+sfin[t]it\w+\s+mucenic\w*/, 'Sf. Sfințit Mc.'],
  [/^sfin[t]i[t]ilor\s+mucenic\w*/, 'Sf. Sfințiți Mc.'],
  [/^sfin[t]it\w+\s+mucenic\w*/, 'Sf. Sfințit Mc.'],
  [/^sf\w+\s+(slavit\w+\s+)?apostol\w*\s+si\s+evanghelist\w*/, 'Sf. Ap. și Ev.'],
  [/^sf\w+\s+(slavit\w+\s+)?(intai\w*\s+(mucenic\w*\s+)?)?apostol\w*/, 'Sf. Ap.'],
  [/^(intai\w*\s+)?apostol\w*/, 'Sf. Ap.'],
  [/^sf\w+\s+(slavit\w+\s+)?(mar\w+\s+)?prooroc\w*/, 'Sf. Prooroc'],
  [/^(prooroc|profet)\w*/, 'Sf. Prooroc'],
  [/^(sf\w+\s+)?arhanghel\w*/, 'Sf. Arh.'],
  [/^sf\w+\s+nou\w+\s+mucenic\w*/, 'Sf. Nou Mc.'],
  [/^nou\w+\s+mucenic\w*/, 'Sf. Nou Mc.'],
  [/^(sf\w+\s+)?cuvio\w+\s+mucenic\w*/, 'Sf. Cuv. Mc.'],
  [/^sf\w+\s+ierarh\w*/, 'Sf. Ier.'],
  [/^cel(ui|or)?\s+(dintre|intre|intru)\s+sfinti\b/, 'Sf. Ier.'],
  [/^sf\w+\s+mucenic\w*/, 'Sf. Mc.'],
  [/^sfin[t]ilor\s+mucenic\w*/, 'Sf. Mc.'],
  [/^mucenic\w+/, 'Sf. Mc.'],
  [/^sf\w+\s+(si\s+)?drept\w*/, 'Sf. Drept'],
  [/^drept\w+/, 'Sf. Drept'],
  [/^(evlavio|dreptcredincio|binecredincio|binecinstitor)\w*\s+imparates\w+/, 'Sf. Împărăteasa'],
  [/^(evlavio|dreptcredincio|binecredincio|binecinstitor)\w*\s+imparat\w*/, 'Sf. Împărat'],
  [/^imparates\w+/, 'Sf. Împărăteasa'],
  [/^imparat\w+/, 'Sf. Împărat'],
  [/^fericit\w+/, 'Fer.'],
  [/^prea\s*(cuvio)(s|as)\w*/, 'Sf. Cuv.'],
  [/^(preacuvio|precuvio|pracuvio|cuvio)(s|as)\w*/, 'Sf. Cuv.'],
  [/^sf\w+/, 'Sf.'],
];
// Genitive filler that may sit between the role root and the proper name.
const FILLER = /^(nostru|nostri|nostre|noastre|noastra|parintelui|parintele|parinti|parintii|parintilor|maicii|maica|maicei|maici|monah\w*)\b\s*/;

// Typed commemorations — keep the lead word, recurse the role mapper on the rest.
const TYPED = [
  [/^soborul\w*\s*/, 'Soborul '],
  [/^(afl[a]r(ii|ea))\s+(celei\s+de\s+a\s+\w+\s+)?(sfintelor\s+|cinstitelor\s+|cinstitului\s+|sfintelor\s+|sfintului\s+)?moaste\w*\b\s*/, 'Aflarea moaștelor '],
  [/^(aducer(ii|ea))\s+(sfintelor\s+|cinstitelor\s+|preacinstitelor\s+)?moaste\w*\b\s*/, 'Aducerea moaștelor '],
  [/^(mut[a]r(ii|ea))\s+(sfintelor\s+|cinstitelor\s+)?moaste\w*\b\s*/, 'Mutarea moaștelor '],
  [/^(scoaterii\s+si\s+mut[a]r(ii|ea))\s+(sfintelor\s+|cinstitelor\s+)?moaste\w*\b\s*/, 'Mutarea moaștelor '],
  [/^afl[a]r(ii|ea)\b\s*/, 'Aflarea '],
  [/^aducer(ii|ea)\b\s*/, 'Aducerea '],
  [/^mut[a]r(ii|ea)\b\s*/, 'Mutarea '],
  [/^puner(ii|ea)\b\s*/, 'Punerea '],
  [/^t[a]ier(ii|ea)\b\s*/, 'Tăierea '],
  [/^t[a]rnosir(ii|ea)\b\s*/, 'Târnosirea '],
  [/^sfin[t]ir(ii|ea)\b\s*/, 'Sfințirea '],
  [/^minun(ii|ea)\b\s*/, 'Minunea '],
  [/^icoan(ei|a)\b\s*(preasfintei\s+de\s+dumnezeu\s+nascatoarei\b[^,]*|maicii\s+domnului\b)?\s*/, 'Icoana Maicii Domnului '],
];

const NUMWORD = {
  doi: 2, doua: 2, trei: 3, patru: 4, cinci: 5, sase: 6, sapte: 7, opt: 8,
  noua: 9, zece: 10, unsprezece: 11, doisprezece: 12, douasprezece: 12,
  treisprezece: 13, paisprezece: 14, cincisprezece: 15, saisprezece: 16,
  saptesprezece: 17, optsprezece: 18, nouasprezece: 19, douazeci: 20,
  treizeci: 30, patruzeci: 40, cincizeci: 50, saizeci: 60, saptezeci: 70,
  optzeci: 80, nouazeci: 90, suta: 100, suti: 100,
};
// Plural group nouns → short form for "{N} de {noun}".
const GROUP_NOUN = {
  mucenici: 'Mc.', mucenite: 'Mc.', parinti: 'Părinți', monahi: 'Monahi',
  prunci: 'Prunci', sfinti: 'Sf.', fecioare: 'Fecioare', copii: 'Copii',
  ostasi: 'Ostași', tineri: 'Tineri', apostoli: 'Ap.',
};

// Drop only the date preamble ("În această lună, în ziua a …," / "Tot în
// această zi,"), keeping the lead verb ("pomenirea …") and everything after.
// Two title formats:
//   "(Tot )?în această zi[,:; ]"            → strip the phrase + one trailing
//                                              separator; NEVER eat the name.
//   "(Tot )?(în )?această lună, (în ziua a <ordinal>,)?" → strip through the
//                                              ordinal's terminating comma.
function stripDateOnly(title) {
  const f = fold(title);
  const zi = /^\s*(tot\s+)?[îi]n(tru)?\s+aceast\s*a\s+zi\b\s*[,:;]?\s*/.exec(f);
  if (zi) return title.slice(zi[0].length).replace(/^[\s,:;]+/, '');
  const luna = /^\s*(tot\s+)?([îi]n(tru)?\s+)?aceast\s*a\s+lun\s*a\b[^,]*,\s*([îi]n\s+ziua\b[^,]*,\s*)?/.exec(f);
  if (luna) return title.slice(luna[0].length).replace(/^[\s,:;]+/, '');
  return title.replace(/^[\s,]+/, '');
}

// Drop the lead verb ("pomenirea" / "prăznuim pomenirea" / "se săvârșesc …")
// and any post-lead filler, leaving the commemoration's substance.
function afterLeadVerb(s) {
  const f = fold(s);
  const re = new RegExp(LEAD.source, 'g');
  let m, idx = -1, len = 0;
  while ((m = re.exec(f)) && m.index <= 30) { idx = m.index; len = m[0].length; }
  let body = idx >= 0 ? s.slice(idx + len) : s;
  const pl = POST_LEAD.exec(fold(body));
  if (pl) body = body.slice(pl[0].length);
  return body.replace(/^[\s,]+/, '');
}

function cutBio(orig) {
  const f = fold(orig);
  let cut = orig.length;
  const dot = f.search(SENTENCE_END);
  if (dot !== -1) cut = Math.min(cut, dot);
  for (const re of BIO) {
    const m = re.exec(f);
    if (m && m.index < cut) cut = m.index;
  }
  // First comma followed by a lowercase word starts a descriptive/title
  // clause ("Clement, episcopul Ancirei"); a comma before a capital is a
  // co-commemorated name in a list ("Vas, Eusebiu, …") — keep those.
  const comma = /,\s+[a-zăâîșşțţãé]/.exec(orig);
  if (comma && comma.index < cut) cut = comma.index;
  return orig.slice(0, cut).replace(/[\s,;:]+$/, '').trim();
}

function consumeFiller(frag) {
  frag = frag.replace(/^[\s,:]+/, '');
  let m;
  while ((m = FILLER.exec(fold(frag)))) frag = frag.slice(m[0].length).replace(/^[\s,:]+/, '');
  return frag;
}

// "<number> (mii)? de <group-noun> …" → "{N} de {short} …".
function martyrCount(frag) {
  const f = fold(frag);
  const thou = /^([a-z]+)\s+(mii|mie)\s+de\s+([a-z]+)/.exec(f);
  if (thou && NUMWORD[thou[1]] != null && GROUP_NOUN[thou[3]]) {
    const n = (NUMWORD[thou[1]] * 1000).toLocaleString('en-US').replace(/,/g, '.');
    const tail = frag.slice(thou[0].length).replace(/^[\s,:]+/, '');
    return `${n} de ${GROUP_NOUN[thou[3]]}${tail ? ' ' + tail : ''}`;
  }
  const m = /^([a-z]+)(\s+si\s+([a-z]+))?\s+(\(\d+\)\s*)?de\s+([a-z]+)/.exec(f);
  if (!m) return frag;
  const tens = NUMWORD[m[1]];
  const noun = GROUP_NOUN[m[5]];
  if (tens == null || !noun) return frag;
  const n = m[3] != null && NUMWORD[m[3]] != null && tens >= 20 ? tens + NUMWORD[m[3]] : tens;
  const tail = frag.slice(m[0].length).replace(/^[\s,:]+/, '');
  return `${n} de ${noun}${tail ? ' ' + tail : ''}`;
}

// Leading connectors/filler that can precede the role ("a", "ale", "lui",
// "părintelui nostru", …) — but never "celui/cel … între sfinți", which is
// itself a role and is handled in tryRoles first.
const LEAD_CONNECTOR = /^(a|ale|al|lui|cea|cele|celei)\b\s*/;
function tryRoles(frag) {
  for (const [re, pre] of ROLES) {
    const m = re.exec(fold(frag));
    if (m) {
      const rest = martyrCount(consumeFiller(frag.slice(m[0].length)));
      return `${pre} ${rest}`.replace(/\s+/g, ' ').replace(/[\s,;:]+$/, '').trim();
    }
  }
  return null;
}

// Returns a clean short saint name, or null when no liturgical role / numbered
// group can be recognized (so the caller can keep the full commemoration text).
function extractName(frag) {
  frag = frag.replace(/^[\s,]+/, '');
  if (!frag) return null;
  // Pass 1: role at the head (catches "celui între sfinți …").
  let out = tryRoles(frag);
  if (out) return out;
  // Pass 2: strip leading connectors + genitive filler, retry.
  let stripped = consumeFiller(frag.replace(LEAD_CONNECTOR, ''));
  let prev;
  do { prev = stripped; stripped = consumeFiller(stripped.replace(LEAD_CONNECTOR, '')); } while (stripped !== prev);
  if (stripped && stripped !== frag) {
    out = tryRoles(stripped);
    if (out) return out;
    frag = stripped;
  }
  // Numbered group ("celor zece mii de mucenici", "șase sfinți mucenici", …).
  const ungrouped = frag.replace(/^cel(or|ui)\s+/i, '');
  const grouped = martyrCount(ungrouped);
  if (grouped !== ungrouped) return ('Sf. ' + grouped).replace(/\s+/g, ' ').replace(/[\s,;:]+$/, '').trim();
  const loose = /^([a-z]+)(\s+si\s+([a-z]+))?\s+(sfin[t]i\w*\s+)?([a-z]+)/.exec(fold(ungrouped));
  if (loose && NUMWORD[loose[1]] != null && GROUP_NOUN[loose[5]]) {
    const n = loose[3] != null && NUMWORD[loose[3]] != null && NUMWORD[loose[1]] >= 20
      ? NUMWORD[loose[1]] + NUMWORD[loose[3]] : NUMWORD[loose[1]];
    const tail = ungrouped.slice(loose[0].length).replace(/^[\s,:]+/, '');
    return `Sf. ${n} ${GROUP_NOUN[loose[5]]}${tail ? ' ' + tail : ''}`.replace(/\s+/g, ' ').replace(/[\s,;:]+$/, '').trim();
  }
  return null;
}

// Like extractName but never null — used for the tail of a typed commemoration
// ("Târnosirea <Mănăstirii …>"), where the remainder is kept verbatim.
function roleifyKeep(frag) {
  return extractName(frag) ?? consumeFiller(frag.replace(LEAD_CONNECTOR, '')).replace(/[\s,;:]+$/, '').trim();
}

// Prose fragments / quote attributions the lives parser sometimes captures as
// a section head — never a commemoration.
const PROSE = /^(din\s+(cuvant|viata|vietile|pateric|cartea|scrisoarea)|deci\b|asadar\b|iar\b|insa\b|cuvant\s+(de|al)|stih(uri)?\b|povestir|in\s+anul\b|aceasta\s+a\s+fost|pentru\s+aceasta|precum\b|si\s+asa\b)/;
// All-caps single sub-heads (the 06-30 Apostles list) — covered by the
// "Soborul …Apostoli" entry; not standalone commemorations.
const CAPS_SUBHEAD = /^[A-ZȘȚĂÂÎ][A-ZȘȚĂÂÎ ().,'-]{0,28}:?\s*$/;

export function titleToName(title) {
  if (!title || typeof title !== 'string') return null;
  const t = title.trim();
  if (CLOSING.test(fold(t))) return null; // page-end prayer
  if (CAPS_SUBHEAD.test(t)) return null; // caps sub-head (apostle list)
  if (PROSE.test(fold(t))) return null; // prose fragment

  // The commemoration sentence (after the date preamble, up to the first
  // sentence break) — keeps the lead verb and any descriptive clause.
  const afterDate = stripDateOnly(title);
  const sentence = afterDate.split(SENTENCE_END)[0].trim();
  if (fold(sentence).length < 3) return null;
  // Great Feasts / feast-cycle days belong in fixedFeasts[].feasts, not here.
  if (FEAST_WORDS.test(fold(sentence))) return null;

  // Try to reduce to a short "Sf. …" name.
  const nameBody = cutBio(afterLeadVerb(sentence));
  if (nameBody && fold(nameBody).length >= 2) {
    for (const [re, rep] of TYPED) {
      const m = re.exec(fold(nameBody));
      if (m) {
        const out = (rep + roleifyKeep(nameBody.slice(m[0].length))).replace(/\s+/g, ' ').trim();
        return out.replace(/[\s,;:]+$/, '') || null;
      }
    }
    const short = extractName(nameBody);
    if (short) return short;
  }

  // No proper name to isolate (e.g. "cohortei ostașilor, care de sabie s-au
  // săvârșit") — keep the full commemoration rather than a meaningless
  // fragment, as a "Pomenirea …" line.
  // Each word keeps its own case (proper names capital, common words lower).
  // Drop orphaned clauses ("care în pace s-a săvârșit") and runaway narrative
  // sentences — those aren't commemorations.
  const full = afterLeadVerb(sentence).replace(/^[\s,]+/, '');
  if (!full || fold(full).length < 4) return null;
  if (CLAUSE_START.test(fold(full))) return null;
  if (full.length > 90) return null;
  return ('Pomenirea ' + full).replace(/\s+/g, ' ').replace(/[\s,;:]+$/, '').trim();
}
