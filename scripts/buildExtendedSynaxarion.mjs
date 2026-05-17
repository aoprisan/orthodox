#!/usr/bin/env node
// Builds src/data/extendedSynaxarion.ts from upstream open-source datasets:
//   • OCA Julian saints  (English, structured, 366 days)
//   • PasiSfinti 2026    (Romanian, free-text description per day, 366 days)
//
// Run:
//   node scripts/buildExtendedSynaxarion.mjs
//
// Inputs are pulled from raw.githubusercontent.com and cached under tmp/.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const tmp = resolve(root, 'tmp');

const sources = {
  oca: {
    url: 'https://raw.githubusercontent.com/nikolareljin/orthodox-calendar/main/backend/app/data/oca_julian.json',
    cache: resolve(tmp, 'oca_julian.json'),
  },
  ro: {
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
  return JSON.parse(await readFile(s.cache, 'utf8'));
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
const roYear = (await fetchCached(sources.ro))['2026'];

const out = {};

// English from OCA — use the longer `title` field (cleaner than `name`).
for (const day of oca) {
  const key = day.month_day;
  out[key] ??= { en: [], ro: [] };
  for (const s of day.saints) {
    if (isFeastEN(s)) continue;
    const title = cleanName(s.title || s.name);
    if (!title) continue;
    if (!out[key].en.some((x) => x.name === title)) {
      out[key].en.push({ name: title });
    }
  }
}

// Romanian from PasiSfinti — split the free-text description by ';'.
for (const monthStr of Object.keys(roYear)) {
  const m = parseInt(monthStr, 10);
  for (const dayEntry of roYear[monthStr]) {
    const d = parseInt(dayEntry.dayNumber, 10);
    if (!d) continue;
    const key = mmdd(m, d);
    out[key] ??= { en: [], ro: [] };
    for (const part of parseRoDescription(dayEntry.description)) {
      if (isFeastRO(part)) continue;
      if (!out[key].ro.some((x) => x.name === part)) {
        out[key].ro.push({ name: part });
      }
    }
  }
}

// Sort keys so the generated file is stable.
const keys = Object.keys(out).sort();

const lines = [];
lines.push('// AUTO-GENERATED by scripts/buildExtendedSynaxarion.mjs — do not edit.');
lines.push('// Sources:');
lines.push('//   English: https://github.com/nikolareljin/orthodox-calendar  (OCA Julian)');
lines.push('//   Romanian: https://github.com/ocaciuc/PasiSfinti               (calendar_with_comments_2026)');
lines.push('//');
lines.push('// This is the "lesser commemorations" supplement to fixedFeasts.ts. The');
lines.push('// principal saints of each day remain in fixedFeasts.ts (bilingual,');
lines.push('// curated). feasts.ts merges the two at lookup time, deduplicating by');
lines.push('// a normalized-name comparison.');
lines.push('');
lines.push('export interface ExtSaintRaw { name: string }');
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
