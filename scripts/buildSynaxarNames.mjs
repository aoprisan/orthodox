#!/usr/bin/env node
// Rebuilds the Romanian (`ro`) bucket of src/data/extendedSynaxarion.ts from
// the authoritative calendar-ortodox.ro commemorations already captured in
// public/lives/*.json (their prose `subtitlu` titles), parsed into short
// saint names by scripts/lib/parseCaoNames.mjs.
//
// The English (`en`) bucket — OCA Julian saints — is preserved verbatim from
// the existing file; only `ro` is regenerated. This keeps the saint list shown
// in the app consistent with the lives prose displayed beneath it.
//
//   node scripts/buildSynaxarNames.mjs
//
// Prereq: public/lives/*.json (see scripts/buildSynaxarLives.mjs).

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { titleToName } from './lib/parseCaoNames.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const dataPath = resolve(root, 'src/data/extendedSynaxarion.ts');
const livesDir = resolve(root, 'public/lives');

// Pull the existing `extendedSynaxarion` object literal out of the .ts file
// and evaluate it (single-quoted keys + JSON values are valid JS).
async function readExisting() {
  const src = await readFile(dataPath, 'utf8');
  const start = src.indexOf('= {', src.indexOf('extendedSynaxarion'));
  const open = src.indexOf('{', start);
  let depth = 0, end = -1;
  for (let i = open; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  const obj = src.slice(open, end + 1);
  // eslint-disable-next-line no-new-func
  return Function(`return (${obj})`)();
}

const MONTHS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

async function buildRo() {
  const ro = {}; // "MM-DD" -> [{ name }]
  for (const mm of MONTHS) {
    const month = JSON.parse(await readFile(resolve(livesDir, `${mm}.json`), 'utf8'));
    for (const [dd, day] of Object.entries(month)) {
      const key = `${mm}-${dd}`;
      const seen = new Set();
      const list = [];
      for (const sec of day.sections || []) {
        // A few pages collapse the whole day into one section; split on the
        // "Tot în această zi" boundary so every commemoration is parsed.
        const chunks = sec.title.split(
          /(?=\bTot[\s-]+[îiÎI]n\s+aceast[ăaãĂ]\s+zi\b)|;\s*(?=pomenir|cinstim|praznui|amintir)/i,
        );
        for (const chunk of chunks) {
          const name = titleToName(chunk);
          if (!name || name.length < 3) continue;
          if (seen.has(name)) continue;
          seen.add(name);
          list.push({ name });
        }
      }
      ro[key] = list;
    }
  }
  return ro;
}

const existing = await readExisting();
const ro = await buildRo();

const keys = [...new Set([...Object.keys(existing), ...Object.keys(ro)])].sort();

const lines = [];
lines.push('// AUTO-GENERATED — do not edit.');
lines.push('//   EN bucket: scripts/buildExtendedSynaxarion.mjs (OCA Julian dataset)');
lines.push('//   RO bucket: scripts/buildSynaxarNames.mjs (calendar-ortodox.ro commemorations,');
lines.push('//              parsed from public/lives/*.json via scripts/lib/parseCaoNames.mjs)');
lines.push('//');
lines.push('// "Lesser commemorations" supplement to fixedFeasts.ts. The principal saints of');
lines.push('// each day stay in fixedFeasts.ts (bilingual, curated); feasts.ts merges the two');
lines.push('// at lookup time, deduplicating by a normalized-name comparison. The Romanian');
lines.push('// view is built from the RO bucket; the EN bucket is shown only to English readers.');
lines.push('');
lines.push('export interface ExtSaintRaw {');
lines.push('  /** Source-language text. English for the `en` bucket, Romanian for `ro`. */');
lines.push('  name: string;');
lines.push('  /** Optional companion translation (legacy; unused by the RO view). */');
lines.push('  ro?: string;');
lines.push('}');
lines.push('export interface ExtDay { en: ExtSaintRaw[]; ro: ExtSaintRaw[] }');
lines.push('');
lines.push('export const extendedSynaxarion: Record<string, ExtDay> = {');
for (const k of keys) {
  const en = (existing[k]?.en ?? []).map((s) => JSON.stringify(s)).join(', ');
  const roList = (ro[k] ?? []).map((s) => JSON.stringify(s)).join(', ');
  lines.push(`  '${k}': {`);
  lines.push(`    en: [${en}],`);
  lines.push(`    ro: [${roList}],`);
  lines.push(`  },`);
}
lines.push('};');
lines.push('');

await writeFile(dataPath, lines.join('\n'));

const enCount = keys.reduce((n, k) => n + (existing[k]?.en?.length ?? 0), 0);
const roCount = keys.reduce((n, k) => n + (ro[k]?.length ?? 0), 0);
console.log(`wrote ${dataPath}`);
console.log(`  ${keys.length} days, ${enCount} EN entries (preserved), ${roCount} RO entries (calendar-ortodox.ro)`);
