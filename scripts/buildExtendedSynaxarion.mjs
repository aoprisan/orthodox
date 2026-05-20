#!/usr/bin/env node
// Builds src/data/extendedSynaxarion.ts from upstream open-source datasets:
//   • OCA Julian saints     (English, structured, 366 days)
//   • LUMINA / marturisire   (Romanian, principal + others[], 365 days, 2026)
//   • PasiSfinti 2026        (Romanian, free-text description per day; secondary)
//
// NOTE: The Romanian (`ro`) bucket this writes from LUMINA/PasiSfinti is
// immediately overwritten by scripts/buildSynaxarNames.mjs, which rebuilds it
// from the authoritative calendar-ortodox.ro commemorations. Always run the
// two together (npm run build:synaxarion does). This script's lasting output
// is the English (`en`) OCA bucket.
//
// Run:
//   node scripts/buildExtendedSynaxarion.mjs && node scripts/buildSynaxarNames.mjs
//
// Inputs are pulled from raw.githubusercontent.com and cached under tmp/.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { translateEntry } from './translateToRo.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const tmp = resolve(root, 'tmp');

const sources = {
  oca: {
    url: 'https://raw.githubusercontent.com/nikolareljin/orthodox-calendar/main/backend/app/data/oca_julian.json',
    cache: resolve(tmp, 'oca_julian.json'),
  },
  lumina: {
    url: 'https://raw.githubusercontent.com/citrixache-commits/marturisire/main/data/saints-calendar.ts',
    cache: resolve(tmp, 'lumina.ts'),
    parse: 'lumina-ts',
  },
  pasi: {
    url: 'https://raw.githubusercontent.com/ocaciuc/PasiSfinti/main/docs/calendar_with_comments_2026.json',
    cache: resolve(tmp, 'pasisfinti_2026.json'),
  },
};

async function fetchCached(s) {
  if (!existsSync(s.cache)) {
    await mkdir(tmp, { recursive: true });
    const res = await fetch(s.url, { headers: { 'User-Agent': 'orthodox-calendar-build' } });
    if (!res.ok) throw new Error(`fetch ${s.url}: HTTP ${res.status}`);
    await writeFile(s.cache, await res.text());
  }
  const raw = await readFile(s.cache, 'utf8');
  if (s.parse === 'lumina-ts') return parseLuminaTs(raw);
  return JSON.parse(raw);
}

// Parse the LUMINA TypeScript source: extract the saintsCalendar object,
// turn TS keys into quoted JSON keys, strip trailing commas, JSON.parse.
function parseLuminaTs(text) {
  const start = text.indexOf('saintsCalendar:');
  const open = text.indexOf('{', start);
  let depth = 0;
  let end = -1;
  for (let i = open; i < text.length; i++) {
    if (text[i] === '{') depth++;
    else if (text[i] === '}') {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }
  let obj = text.slice(open, end + 1);
  obj = obj.replace(/(\W)(name|others|fasting|type|gospel|gospelRef)(\s*:)/g, '$1"$2"$3');
  obj = obj.replace(/,(\s*[}\]])/g, '$1');
  return JSON.parse(obj);
}

const mmdd = (m, d) => `${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

// Strip a leading dangling conjunction left over when upstream split a phrase
// like "Venerable and God-bearing Father Anthony" — the OCA dataset stores
// "and God-bearing Father Anthony" as the name and the full thing as the title.
function cleanName(s) {
  return s
    .replace(/^\s*[†)(]+\s*/g, '')
    .replace(/^\s*(and|the|of)\s+/i, (m) => m)
    .replace(/\s+/g, ' ')
    .trim();
}

// "Sf. Ier. Vasile cel Mare; Sf. Cuv. Serafim de Sarov; (Tedeum)" →
//   ["Sf. Ier. Vasile cel Mare", "Sf. Cuv. Serafim de Sarov"]
function parseRoDescription(desc) {
  if (!desc) return [];
  let s = desc
    .replace(/\([^)]*\)/g, ' ')   // drop parenthetical liturgical notes
    .replace(/[†)]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return s
    .split(/[;]+/)
    .map((p) => p.trim().replace(/[.,;:\s]+$/, ''))
    .filter((p) => p.length > 2);
}

// Drop entries that are clearly the principal Great Feast of the day — those
// already live in fixedFeasts[].feasts, so we don't want to also list them
// among the saints.
const FEAST_NAME_PATTERNS = [
  /circumcision of (our )?lord/i,
  /^the (theophany|nativity|annunciation|transfiguration|ascension|meeting|presentation|exaltation|elevation)\b/i,
  /^(theophany|holy theophany|nativity of (our|the))/i,
  /^pascha\b/i,
  /^pentecost\b/i,
  /^holy and great\b/i,
  /^palm sunday\b/i,
  /^(forefeast|leavetaking) of/i,
];
const FEAST_RO_PATTERNS = [
  /tăierea[- ]împrejur/i,
  /botezul domnului/i,
  /întâmpinarea domnului/i,
  /buna vestire/i,
  /schimbarea la faț/i,
  /înălțarea (sfintei )?(cruci|domnului)/i,
  /adormirea maicii domnului/i,
  /nașterea maicii domnului/i,
  /intrarea (maicii domnului|în biseric)/i,
  /sfintele paști|învierea domnului/i,
  /pogorârea sfântului duh|rusalii/i,
  /naşterea domnului|nasterea domnului|crăciun/i,
  /odovania|înainte[- ]prăznuir|după[- ]prăznuir/i,
];

function isFeastEN(entry) {
  if (entry.feast_type === 'Great Feast') return true;
  const t = entry.title || entry.name;
  return FEAST_NAME_PATTERNS.some((re) => re.test(t));
}

function isFeastRO(part) {
  // Normalize Romanian comma-below diacritics so /naşterea/ matches both
  // ş (cedilla) and ș (comma below); the dataset mixes the two.
  const folded = part.replace(/ș/g, 'ş').replace(/ț/g, 'ţ');
  return FEAST_RO_PATTERNS.some((re) => re.test(folded));
}

const oca = await fetchCached(sources.oca);
const lumina = await fetchCached(sources.lumina);
const pasiYear = (await fetchCached(sources.pasi))['2026'];

const out = {};
const addRo = (key, raw) => {
  if (!raw) return;
  const cleaned = raw.replace(/\s+/g, ' ').trim().replace(/[.,;:\s]+$/, '');
  if (cleaned.length < 3) return;
  if (isFeastRO(cleaned)) return;
  out[key] ??= { en: [], ro: [] };
  if (!out[key].ro.some((x) => x.name === cleaned)) {
    out[key].ro.push({ name: cleaned });
  }
};

// English from OCA — use the longer `title` field (cleaner than `name`).
// While we're here, run each entry through the template translator so RO
// viewers see a Romanian rendering when there isn't a native RO entry to
// fall back on.
for (const day of oca) {
  const key = day.month_day;
  out[key] ??= { en: [], ro: [] };
  for (const s of day.saints) {
    if (isFeastEN(s)) continue;
    const title = cleanName(s.title || s.name);
    if (!title) continue;
    if (out[key].en.some((x) => x.name === title)) continue;
    const ro = translateEntry(s) || undefined;
    out[key].en.push(ro ? { name: title, ro } : { name: title });
  }
}

// Romanian primary source: LUMINA / marturisire — keyed by "YYYY-MM-DD",
// each day has a `name` (principal) and `others[]` (lesser). The principal
// often matches what's already in fixedFeasts.ts; we still feed it in so
// the in-app dedup (which only knows our curated list) can catch overlaps,
// and any leftover principal that isn't in our curated dataset appears as
// a secondary entry.
for (const [dateKey, day] of Object.entries(lumina)) {
  const m = parseInt(dateKey.slice(5, 7), 10);
  const d = parseInt(dateKey.slice(8, 10), 10);
  if (!m || !d) continue;
  const key = mmdd(m, d);
  addRo(key, day.name);
  for (const o of day.others || []) addRo(key, o);
}

// Romanian secondary: PasiSfinti — fills gaps from a different selection.
for (const monthStr of Object.keys(pasiYear)) {
  const m = parseInt(monthStr, 10);
  for (const dayEntry of pasiYear[monthStr]) {
    const d = parseInt(dayEntry.dayNumber, 10);
    if (!d) continue;
    const key = mmdd(m, d);
    for (const part of parseRoDescription(dayEntry.description)) {
      addRo(key, part);
    }
  }
}

// Sort keys so the generated file is stable.
const keys = Object.keys(out).sort();

const lines = [];
lines.push('// AUTO-GENERATED by scripts/buildExtendedSynaxarion.mjs — do not edit.');
lines.push('// Sources:');
lines.push('//   English:  https://github.com/nikolareljin/orthodox-calendar       (OCA Julian)');
lines.push('//   Romanian: https://github.com/citrixache-commits/marturisire        (LUMINA — primary)');
lines.push('//             https://github.com/ocaciuc/PasiSfinti                    (secondary)');
lines.push('//');
lines.push('// This is the "lesser commemorations" supplement to fixedFeasts.ts. The');
lines.push('// principal saints of each day remain in fixedFeasts.ts (bilingual,');
lines.push('// curated). feasts.ts merges the two at lookup time, deduplicating by');
lines.push('// a normalized-name comparison.');
lines.push('');
lines.push('export interface ExtSaintRaw {');
lines.push('  /** Source-language text. For the `en` bucket this is English; for');
lines.push('   *  the `ro` bucket it is Romanian. */');
lines.push('  name: string;');
lines.push('  /** Optional companion translation. For OCA entries this is the');
lines.push('   *  template-translated Romanian rendering. */');
lines.push('  ro?: string;');
lines.push('}');
lines.push('export interface ExtDay { en: ExtSaintRaw[]; ro: ExtSaintRaw[] }');
lines.push('');
lines.push('export const extendedSynaxarion: Record<string, ExtDay> = {');
for (const k of keys) {
  const e = out[k];
  const en = e.en.map((s) => JSON.stringify(s)).join(', ');
  const ro = e.ro.map((s) => JSON.stringify(s)).join(', ');
  lines.push(`  '${k}': {`);
  lines.push(`    en: [${en}],`);
  lines.push(`    ro: [${ro}],`);
  lines.push(`  },`);
}
lines.push('};');
lines.push('');

const outPath = resolve(root, 'src/data/extendedSynaxarion.ts');
await writeFile(outPath, lines.join('\n'));

const enCount = keys.reduce((n, k) => n + out[k].en.length, 0);
const roCount = keys.reduce((n, k) => n + out[k].ro.length, 0);
console.log(`wrote ${outPath}`);
console.log(`  ${keys.length} days, ${enCount} EN entries, ${roCount} RO entries`);
