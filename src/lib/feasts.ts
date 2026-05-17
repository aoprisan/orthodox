import type { CalendarKind, DayEntry, Feast, Saint } from '../types';
import { gregorianToJulian, mmdd, ymdFromDate } from './julian';
import { fixedFeasts } from '../data/fixedFeasts';
import { extendedSynaxarion } from '../data/extendedSynaxarion';
import { moveableFeastsOn } from './moveableFeasts';
import { looksEnglish } from '../i18n/loc';

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
  const saints: Saint[] = [...fixed.saints, ...extendedSaintsFor(key, fixed.saints)];
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
  const tryAdd = (raw: string, makeSaint: () => Saint) => {
    const k = normalize(raw);
    if (!k) return;
    if (taken.has(k)) return;
    // Substring dedup is only safe when both sides are multi-token —
    // single-token keys like "basil" or "john" would wrongly collapse
    // distinct saints (Basil the Great vs Basil of Ancyra).
    const isMulti = (s: string) => s.includes(' ');
    if (isMulti(k) && principalKeys.some((p) => p && isMulti(p) && (p.includes(k) || k.includes(p)))) {
      return;
    }
    taken.add(k);
    out.push(makeSaint());
  };
  for (const e of ext.en) {
    // EN bucket carries the OCA English text plus an optional Romanian
    // rendering produced by the template translator at build time. The
    // translator is incomplete and often leaves English words behind
    // ("Sf. Ap. Andronicus din Seventy și său fellow-laborer"); when that
    // happens, drop the broken Romanian so the entry stores as a plain
    // English string. The RO-mode filter in DayDetail/TodayCard then hides
    // it instead of showing pseudo-Romanian to a Romanian reader.
    const hasUsableRo = e.ro && !looksEnglish(e.ro);
    tryAdd(e.name, () =>
      hasUsableRo
        ? { name: { en: e.name, ro: e.ro! }, secondary: true }
        : { name: e.name, secondary: true },
    );
  }
  for (const e of ext.ro) {
    // RO bucket: native Romanian entries (LUMINA / PasiSfinti). Mirror the
    // Romanian text into the EN slot so English viewers see the Romanian
    // wording rather than nothing — this is honest, since we don't have a
    // proper English translation of these names.
    tryAdd(e.name, () => ({ name: { en: e.name, ro: e.name }, secondary: true }));
  }
  return out;
}

function collectKeys(keys: string[], value: Saint['name'] | Saint['title']) {
  if (value == null) return;
  if (typeof value === 'string') {
    keys.push(normalize(value));
    return;
  }
  if (value.en) keys.push(normalize(value.en));
  if (value.ro) keys.push(normalize(value.ro));
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
]);

/**
 * Reduce a saint's name to a comparison key. Lowercase, drop diacritics
 * (including Romanian comma-below ș/ț), strip everything that isn't a
 * letter or space, then remove canonical liturgical noise tokens
 * (Saint, Sf. Cuv., Venerable, Hieromartyr, …). What's left is the
 * proper-name core. Dedup compares both equality and substring overlap so
 * "Anthony the Great" and "Venerable and God-bearing Father Anthony the
 * Great" collapse to the same saint.
 */
function normalize(s: string): string {
  let n = s.toLowerCase();
  // Pre-fold Romanian comma-below diacritics that NFD doesn't separate.
  n = n.replace(/ș/g, 's').replace(/ț/g, 't');
  n = n.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // First comma keeps just the head clause ("Saint Basil the Great" vs
  // "Saint Basil the Great, Archbishop of Caesarea").
  n = n.split(',')[0];
  // Keep letters and spaces only — dots, dashes, parens, daggers all go.
  n = n.replace(/[^a-z\s]/g, ' ');
  const tokens = n.split(/\s+/).filter((t) => t && !DROP_TOKENS.has(t));
  return tokens.join(' ');
}
