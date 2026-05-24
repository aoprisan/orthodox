#!/usr/bin/env node
// Discovery diff: which saints does doxologia.ro list that our calendar is
// missing? Read-only — produces a report; it never edits the dataset.
//
//   node scripts/diffDoxologiaNames.mjs
//
// Fetches doxologia.ro/sfintidata/2026-MM-DD for every canonical MM-DD (02-29
// from a leap year), parses the saint names out of the <h2 class="titlu">
// headings, and compares them — on a diacritics-folded, honorific-stripped
// "core name" signature — against the names we already carry in
// fixedFeasts.ts + extendedSynaxarion.ts. Names that match nothing on that day
// (e.g. the 2025/2026 Romanian canonizations) are written to tmp/dox-diff.md.
//
// Pages are cached under tmp/dox/ (gitignored); reruns are offline.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const cacheDir = resolve(root, 'tmp/dox');
const dataDir = resolve(root, 'src/data');

const UA = 'orthodox-calendar-build (+https://github.com/aoprisan/orthodox)';
const THROTTLE_MS = 500;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── name normalization ────────────────────────────────────────────────────
const FOLD = { 'ă': 'a', 'â': 'a', 'î': 'i', 'ș': 's', 'ş': 's', 'ț': 't', 'ţ': 't', 'ã': 'a' };
const foldDia = (s) => s.toLowerCase().replace(/[ăâîșşțţã]/g, (c) => FOLD[c] ?? c);

// Honorifics, roles, connectors — everything that isn't the proper name or its
// locality. Stripped from both sides so "Sfântul Cuvios Simeon cel din Muntele
// Minunat" and "Sf. Cuv. Simeon din Muntele Minunat" reduce to the same key.
const STOP = new Set([
  'sf', 'sfantul', 'sfanta', 'sfintii', 'sfintele', 'sfintilor', 'sfant',
  'sfintei', 'sfintului', 'sfanti', 'sfinti',
  'preacuviosul', 'preacuvioasa', 'preacuviosii', 'cuviosul', 'cuvioasa',
  'cuviosii', 'cuvios', 'cuv',
  'mucenicul', 'mucenita', 'mucenicii', 'mucenitele', 'mucenic', 'mucenici',
  'mucenitei', 'mc', 'noul', 'nou', 'noua', 'noii',
  'mare', 'marele', 'marii', 'm',
  'sfintitul', 'sfintit', 'sfintita', 'sfintiti',
  'ierarhul', 'ierarh', 'ier', 'ierarhii',
  'preotul', 'preot', 'preotii', 'diaconul', 'diacon', 'diaconita',
  'arhiepiscopul', 'arhiepiscop', 'episcopul', 'episcop', 'mitropolitul',
  'mitropolit', 'patriarhul', 'patriarh', 'papa', 'staretul', 'starets',
  'marturisitorul', 'marturisitoare', 'marturisitor', 'marturisitorii', 'mart',
  'dreptul', 'dreptii', 'drept', 'dreapta',
  'fericitul', 'fericita', 'fericit', 'fer',
  'proorocul', 'prooroc', 'proorocita', 'profetul', 'profet',
  'apostolul', 'apostol', 'apostolii', 'ap', 'evanghelistul', 'evanghelist', 'ev',
  'arhanghelul', 'arhanghel', 'arh', 'ingerul', 'inger',
  'imparatul', 'imparateasa', 'imparat', 'reginei', 'regina', 'regele', 'regelui',
  'binecredinciosul', 'dreptcredinciosul', 'binecredincioasa', 'voievodul', 'voievod',
  'stalpnicul', 'stalpnic', 'taumaturgul', 'facatorul', 'minuni', 'minunilor',
  'cel', 'cea', 'cei', 'cele', 'celui', 'celor', 'cele',
  'din', 'de', 'la', 'si', 'a', 'al', 'ale', 'ai', 'cu', 'in', 'intru', 'pe',
  'nostru', 'nostri', 'parintele', 'parintelui', 'parintilor', 'parinti',
  'maicii', 'maica', 'maicei', 'sotia', 'sotii', 'fiul', 'fiica', 'fratii', 'frate',
  'impreuna', 'dansul', 'dansa', 'care', 'ca', 'au', 'cea',
]);

// Reduce a display name to a sorted set of distinctive tokens.
function signature(name) {
  const folded = foldDia(name)
    .replace(/[().,;:!?„“"'«»\[\]]/g, ' ')
    .replace(/[-–—]/g, ' ')
    .replace(/✝|†|\)/g, ' ');
  const toks = folded.split(/\s+/).filter(Boolean).filter((t) => {
    if (STOP.has(t)) return false;
    if (/^\d+$/.test(t)) return true; // keep numbers ("318 parinti")
    return t.length >= 3; // drop stray initials / short particles
  });
  return [...new Set(toks)].sort();
}

// Does a doxologia signature match anything we already have that day?
function matched(doxSig, ourSigs) {
  if (doxSig.length === 0) return true; // nothing distinctive → don't flag
  for (const ours of ourSigs) {
    const inter = doxSig.filter((t) => ours.includes(t));
    if (inter.length && inter.length / doxSig.length >= 0.5) return true;
  }
  return false;
}

// ── load our existing names per MM-DD ──────────────────────────────────────
async function loadOurs() {
  const map = new Map(); // "MM-DD" -> [signature, ...]
  const add = (key, name) => {
    if (!name) return;
    const sig = signature(name);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(sig);
  };

  // extendedSynaxarion.ts — evaluate the exported object literal.
  const extSrc = await readFile(resolve(dataDir, 'extendedSynaxarion.ts'), 'utf8');
  const eStart = extSrc.indexOf('= {', extSrc.indexOf('extendedSynaxarion'));
  const eOpen = extSrc.indexOf('{', eStart);
  let depth = 0, eEnd = -1;
  for (let i = eOpen; i < extSrc.length; i++) {
    if (extSrc[i] === '{') depth++;
    else if (extSrc[i] === '}') { if (--depth === 0) { eEnd = i; break; } }
  }
  const ext = Function(`return (${extSrc.slice(eOpen, eEnd + 1)})`)();
  for (const [key, day] of Object.entries(ext)) {
    for (const s of day.ro ?? []) add(key, s.name);
    for (const s of day.en ?? []) add(key, s.name); // EN too, so e.g. Vincent matches
  }

  // fixedFeasts.ts — rewrite [mmdd(M, D)] keys to literal "MM-DD", drop the TS
  // wrapper, then evaluate as a plain object literal.
  let fixSrc = await readFile(resolve(dataDir, 'fixedFeasts.ts'), 'utf8');
  fixSrc = fixSrc.slice(fixSrc.indexOf('{', fixSrc.indexOf('fixedFeasts')));
  let fdepth = 0, fEnd = -1;
  for (let i = 0; i < fixSrc.length; i++) {
    if (fixSrc[i] === '{') fdepth++;
    else if (fixSrc[i] === '}') { if (--fdepth === 0) { fEnd = i; break; } }
  }
  fixSrc = fixSrc.slice(0, fEnd + 1).replace(
    /\[mmdd\((\d+),\s*(\d+)\)\]/g,
    (_, m, d) => `'${String(+m).padStart(2, '0')}-${String(+d).padStart(2, '0')}'`,
  );
  const fixed = Function(`return (${fixSrc})`)();
  for (const [key, day] of Object.entries(fixed)) {
    for (const f of day.feasts ?? []) addLoc(add, key, f.name);
    for (const s of day.saints ?? []) addLoc(add, key, s.name);
  }
  return map;
}
function addLoc(add, key, loc) {
  if (!loc) return;
  if (typeof loc === 'string') return add(key, loc);
  add(key, loc.ro); add(key, loc.en);
}

// ── doxologia fetch + parse ─────────────────────────────────────────────────
function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)))
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/&[a-z]+;/gi, ' ');
}

// Romanian month names — doxologia's per-day URL is /{day}-{month}, day not
// zero-padded (e.g. /7-ianuarie, /12-august, /24-mai). NOTE: /sfintidata/DATE
// is rendered client-side and a plain fetch returns *today's* page, so it is
// unusable here; the name-based URL is server-rendered per day.
const RO_MONTH = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie',
  'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'];

async function fetchDay(mm, dd) {
  const cachePath = resolve(cacheDir, `${mm}-${dd}.html`);
  if (existsSync(cachePath)) return { html: await readFile(cachePath, 'utf8'), cached: true };
  await mkdir(cacheDir, { recursive: true });
  const url = `https://doxologia.ro/${Number(dd)}-${RO_MONTH[Number(mm) - 1]}`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) return { html: null, status: res.status };
  const html = await res.text();
  await writeFile(cachePath, html);
  return { html, cached: false };
}

// Saint names for the day. The commemoration list lives in <div class="zi-title">
// (per-day pages) or <div class="boxsfant-title"> (the "today" layout). Related
// articles also use <h2 class="titlu"> but sit in <li class="cell"> behind a
// <div class="categ"> badge — so we scope by container, not by the name text
// (articles like "Viața Sfântului Mucenic Fotie" also start with "Sf"). Modern
// non-canonized elders ("Arhimandritul Placide Deseille (n. … - a. …)") share
// the container but don't start with "Sf", so the prefix check drops them.
function parseNames(html) {
  const names = [];
  const re = /<h2 class="titlu"[^>]*>\s*(?:<a[^>]*>)?([\s\S]*?)(?:<\/a>)?\s*<\/h2>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const ctx = html.slice(Math.max(0, m.index - 150), m.index);
    if (ctx.includes('categ')) continue; // related-article heading
    if (!ctx.includes('zi-title') && !ctx.includes('boxsfant-title')) continue;
    let name = decodeEntities(m[1].replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
    name = name.replace(/^[✝†)\s]+/, '').trim();
    if (!name) continue;
    // saints only — drop movable feasts, Soborul/feast lines, commemorated laity
    if (!/^sf(antul|anta|intii|intele|intilor|ant)\b/.test(foldDia(name))) continue;
    names.push(name);
  }
  return names;
}

// ── main ────────────────────────────────────────────────────────────────────
const ours = await loadOurs();
const keys = [...ours.keys()].sort();
console.log(`loaded ${keys.length} day-keys from our data`);

const report = [];
let fetched = 0, missing = 0;
for (const key of keys) {
  const [mm, dd] = key.split('-');
  let res;
  try {
    res = await fetchDay(mm, dd);
  } catch (err) {
    report.push({ key, error: err.message });
    continue;
  }
  if (!res.cached) { fetched++; await sleep(THROTTLE_MS); }
  if (!res.html) { report.push({ key, error: `HTTP ${res.status}` }); continue; }

  const doxNames = parseNames(res.html);
  const ourSigs = ours.get(key) ?? [];
  const newOnes = doxNames.filter((n) => !matched(signature(n), ourSigs));
  if (newOnes.length) {
    missing += newOnes.length;
    report.push({ key, newOnes });
  }
}

// ── write report ─────────────────────────────────────────────────────────────
const lines = ['# Doxologia saints not matched in our calendar', ''];
lines.push(`Generated ${new Date().toISOString().slice(0, 10)} — ${missing} unmatched names across ${report.filter((r) => r.newOnes).length} days.`);
lines.push('Heuristic match (folded, honorific-stripped); review before adding — some may be spelling variants of saints we already have.', '');
for (const r of report) {
  if (r.error) { lines.push(`- **${r.key}** — _fetch error: ${r.error}_`); continue; }
  lines.push(`### ${r.key}`);
  for (const n of r.newOnes) lines.push(`- ${n}`);
  lines.push('');
}
const outPath = resolve(root, 'tmp/dox-diff.md');
await writeFile(outPath, lines.join('\n'));
console.log(`fetched ${fetched} new pages; ${missing} unmatched names → ${outPath}`);
