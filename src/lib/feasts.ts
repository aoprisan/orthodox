import type { CalendarKind, DayEntry, Feast, Saint } from '../types';
import { gregorianToJulian, mmdd, ymdFromDate } from './julian';
import { fixedFeasts } from '../data/fixedFeasts';
import { extendedSynaxarion } from '../data/extendedSynaxarion';
import { romanianSaints } from '../data/romanianSaints';
import { moveableFeastsOn } from './moveableFeasts';

/**
 * Given a civil (Gregorian) date and the user's calendar selection, return the
 * combined liturgical entry for the day.
 *
 * - `new` (Revised Julian): fixed feasts are keyed by the civil date as
 *   shown — Christmas is December 25 on the wall calendar.
 * - `old` (Julian): the civil date is converted to Julian first, then used
 *   as the lookup key — so Christmas (Julian Dec 25) lands on civil Jan 7.
 *
 * The saints list is the union of:
 *   1. principal saints from `fixedFeasts.ts` (bilingual, hand-curated)
 *   2. lesser commemorations from `extendedSynaxarion.ts` (auto-generated
 *      from OCA + PasiSfinti datasets) — appended and flagged
 *      `secondary: true`, deduplicated against (1).
 */
export function entryForDate(date: Date, kind: CalendarKind): DayEntry {
  const { m, d } = kind === 'old' ? gregorianToJulian(...gregorianTuple(date)) : ymdFromDate(date);
  const key = mmdd(m, d);
  const fixed = fixedFeasts[key] ?? { feasts: [], saints: [] };
  const moveable = moveableFeastsOn(date);
  const feasts: Feast[] = [...moveable, ...fixed.feasts];
  // Curated principal saints = fixedFeasts + the Romanian-saints supplement
  // (Doxologia). Both claim dedup keys before the extended synaxarion is merged.
  const principal: Saint[] = [...fixed.saints, ...(romanianSaints[key] ?? [])];
  const saints: Saint[] = [...principal, ...extendedSaintsFor(key, principal)];
  return { feasts, saints };
}

function gregorianTuple(date: Date): [number, number, number] {
  return [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()];
}

export function highestRank(feasts: Feast[]): Feast['rank'] | null {
  if (feasts.some((f) => f.rank === 'great')) return 'great';
  if (feasts.some((f) => f.rank === 'major')) return 'major';
  if (feasts.some((f) => f.rank === 'minor')) return 'minor';
  return null;
}

function extendedSaintsFor(key: string, existing: Saint[]): Saint[] {
  const ext = extendedSynaxarion[key];
  if (!ext) return [];
  const principalKeys: string[] = [];
  for (const s of existing) {
    collectKeys(principalKeys, s.name);
    if (s.title) collectKeys(principalKeys, s.title);
  }
  const taken = new Set<string>(principalKeys);
  const out: Saint[] = [];
  const isMulti = (s: string) => s.includes(' ');
  const tryAdd = (raw: string, makeSaint: () => Saint) => {
    const ks = saintKeys(raw);
    if (ks.length === 0) return;
    // Exact match against anything already taken (principal or earlier ext).
    if (ks.some((k) => taken.has(k))) return;
    // Substring dedup is only safe when both sides are multi-token —
    // single-token keys like "basil" or "john" would wrongly collapse
    // distinct saints (Basil the Great vs Basil of Ancyra). Restrict it to
    // the curated principal keys; never substring-merge two extended entries
    // against each other, or a multi-saint commemoration ("Hrisant și Daria")
    // would swallow its individual members.
    if (ks.some((k) => isMulti(k) && principalKeys.some((p) => p && isMulti(p) && (p.includes(k) || k.includes(p))))) {
      return;
    }
    ks.forEach((k) => taken.add(k));
    out.push(makeSaint());
  };
  // RO bucket first: native Romanian commemorations (LUMINA / PasiSfinti).
  // These define the Romanian view, so they must claim their dedup keys before
  // the English bucket — otherwise an identically-spelled OCA entry ("Saint
  // Emilia, …") would seize the key, leaving the native "Sf. Emilia" to be
  // dropped and then hidden from RO readers. Mirror the Romanian text into the
  // EN slot so English viewers see the Romanian wording rather than nothing —
  // honest, since we have no proper English translation of these names.
  for (const e of ext.ro) {
    tryAdd(e.name, () => ({ name: { en: e.name, ro: e.name }, secondary: true }));
  }
  // EN bucket: OCA English text. The build-time template translator that once
  // produced a Romanian rendering for these is too unreliable — it routinely
  // leaves English words behind ("Sf. Greatmartyr, Victory-bearer", "Sf. Mc.
  // Abo Perfumer", "Soborul Ecumenical Teachers") and only duplicates the
  // curated Romanian entries above. So we store these as plain English strings:
  // English viewers see them, and the RO-mode filter in DayDetail/TodayCard
  // (which drops untranslated English) hides them from Romanian readers. The
  // Romanian view is therefore exclusively fixedFeasts.ts + the ext.ro bucket.
  for (const e of ext.en) {
    tryAdd(e.name, () => ({ name: e.name, secondary: true }));
  }
  return out;
}

function collectKeys(keys: string[], value: Saint['name'] | Saint['title']) {
  if (value == null) return;
  if (typeof value === 'string') {
    keys.push(...saintKeys(value));
    return;
  }
  if (value.en) keys.push(...saintKeys(value.en));
  if (value.ro) keys.push(...saintKeys(value.ro));
}

const DROP_TOKENS = new Set([
  // English liturgical prefixes / roles / qualifiers
  'holy', 'the', 'our', 'father', 'mother', 'bearing', 'god', 'godbearing',
  'saint', 'st', 'sts', 'venerable', 'righteous', 'great', 'new', 'old',
  'elder', 'younger', 'wonderworker', 'confessor', 'equal', 'equaltotheapostles',
  'apostles', 'apostle', 'martyr', 'hieromartyr', 'martyrs', 'monkmartyr',
  'prophet', 'prophetess', 'bishop', 'archbishop', 'patriarch', 'metropolitan',
  'pope', 'monk', 'nun', 'monastic', 'enlightener', 'wonder', 'worker',
  'repose', 'of', 'and', 'a', 'an', 'in', 'at', 'to', 'his', 'her',
  // Romanian
  'sf', 'sfantul', 'sfanta', 'sfintii', 'sfintele', 'sfintitul', 'sfintita',
  'sfintit', 'sfintiti', 'cuv', 'cuvios', 'cuviosul', 'cuvioasa', 'cuviosii',
  'ier', 'ierarh', 'ierarhul', 'mc', 'mucenic', 'mucenicul', 'mucenicii',
  'muceniti', 'mucenita', 'mucenițele', 'mucenițe', 'martir',
  'mare', 'cel', 'celui', 'celor', 'cea', 'ap', 'apostol', 'apostolul',
  'prooroc', 'proorocul', 'proorocita', 'prooroci', 'arhiep', 'arhiepiscop',
  'arhiepiscopul', 'ep', 'episcop', 'episcopul', 'patriarh', 'patriarhul',
  'papa', 'romei', 'soborul', 'sobor', 'cinstirea', 'aducerea', 'aflarea',
  'mutarea', 'moastelor', 'moaste', 'chipul', 'icoanei', 'icoana', 'noul',
  'nou', 'noua', 'batran', 'dreptul', 'dreapta', 'dreptii',
  'din', 'de', 'la', 'in', 'si', 'al', 'ale', 'lui', 'pe',
  // Romanian role abbreviations and variant spellings — so "Sf. Pr. Maleahi"
  // keys the same as "Sf. Prooroc Maleahi", "Maxim Mărt" as "Maxim
  // Mărturisitorul", "M. Mc." as "Mare Mucenic", etc.
  'pr', 'proroc', 'prorocul', 'prorocita', 'prooroaca', 'proorocii',
  'mucenici', 'mucenicele', 'mart', 'marturisitorul', 'marturisitoarea',
  'marturisitor', 'marturisitoare', 'm', 'mr', 'arh', 'arhanghel', 'arhangheli',
  'arhanghelul', 'drept', 'sfintei', 'sfant', 'zi', 'ziua',
  // Generic honorific epithets that are not part of the proper name.
  'imparateasa', 'imparatul', 'imparat', 'imp', 'diaconita', 'diaconul',
  'diacon', 'diac', 'preotul', 'preot', 'tanar', 'tanarul', 'tanara',
]);

/**
 * Reduce a saint's name to its proper-name core for comparison. Lowercase,
 * drop diacritics (including Romanian comma-below ș/ț), strip everything that
 * isn't a letter or space, then remove canonical liturgical noise tokens
 * (Saint, Sf. Cuv., Venerable, Hieromartyr, …). What's left is the proper-name
 * core, e.g. "Sf. Cuv. Antonie cel Mare" → "antonie".
 */
function normalizeTokens(s: string): string {
  let n = s.toLowerCase();
  // Pre-fold Romanian comma-below diacritics that NFD doesn't separate.
  n = n.replace(/ș/g, 's').replace(/ț/g, 't');
  n = n.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // Keep letters and spaces only — dots, dashes, parens, daggers all go.
  n = n.replace(/[^a-z\s]/g, ' ');
  const tokens = n.split(/\s+/).filter((t) => t && !DROP_TOKENS.has(t));
  return tokens.join(' ');
}

/**
 * Comparison keys for a saint name. Returns the full normalized key plus —
 * when the name has a trailing comma clause — the head-clause key. Carrying
 * both lets "Sf. Ier. Petru al Sevastiei" and "Sf. Ier. Petru, ep. Sevastiei"
 * collapse on the full key, while "Saint Basil the Great" still collapses with
 * "Saint Basil the Great, Archbishop of Caesarea" on the head key. Distinct
 * saints that merely share a first name (Basil the Great vs Basil of Ancyra)
 * keep their disambiguator in both keys and so stay separate.
 */
function saintKeys(s: string): string[] {
  const full = normalizeTokens(s);
  const comma = s.indexOf(',');
  const head = comma === -1 ? full : normalizeTokens(s.slice(0, comma));
  const keys: string[] = [];
  if (full) keys.push(full);
  if (head && head !== full) keys.push(head);
  return keys;
}
