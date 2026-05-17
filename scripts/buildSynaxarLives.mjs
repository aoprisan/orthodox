#!/usr/bin/env node
// Builds public/lives/{MM}.json from calendar-ortodox.ro per-day pages.
//
//   /luna/{ro-month}/{ro-month}{DD}.htm
//
// One JSON file per month, keyed by DD, holding the structured Romanian
// hagiographic prose for each day. Pages are fetched politely (500 ms
// between cache misses) and cached under tmp/cao/ (gitignored).
//
// Run:
//   node scripts/buildSynaxarLives.mjs

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { parseDay } from './lib/parseCaoLives.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const cacheDir = resolve(root, 'tmp/cao');
const outDir = resolve(root, 'public/lives');

const MONTHS = [
  ['01', 'ianuarie', 31],
  ['02', 'februarie', 29],
  ['03', 'martie', 31],
  ['04', 'aprilie', 30],
  ['05', 'mai', 31],
  ['06', 'iunie', 30],
  ['07', 'iulie', 31],
  ['08', 'august', 31],
  ['09', 'septembrie', 30],
  ['10', 'octombrie', 31],
  ['11', 'noiembrie', 30],
  ['12', 'decembrie', 31],
];

const UA = 'orthodox-calendar-build (+https://github.com/aoprisan/orthodox)';
const THROTTLE_MS = 500;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchWithRetry(url, attempt = 1) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (res.status === 429 || res.status === 503) {
    if (attempt < 2) {
      await sleep(5000);
      return fetchWithRetry(url, attempt + 1);
    }
  }
  return res;
}

// Pages declare their charset in a <meta http-equiv> tag. Some are UTF-8,
// some are iso-8859-2 (Latin-2). We must read as raw bytes, sniff the
// declared charset from the first few KB (meta tags are ASCII-safe in any
// supported encoding), then decode with the right TextDecoder. Caching the
// decoded UTF-8 keeps the cache uniform.
function sniffCharset(buf) {
  const head = new TextDecoder('latin1').decode(buf.slice(0, 4096));
  const m = /charset\s*=\s*["']?([\w-]+)/i.exec(head);
  let cs = (m ? m[1] : 'utf-8').toLowerCase();
  if (cs === 'utf8') cs = 'utf-8';
  return cs;
}

async function fetchCachedHtml(roMonth, dd) {
  const cachePath = resolve(cacheDir, `${roMonth}${dd}.htm`);
  if (existsSync(cachePath)) {
    return { html: await readFile(cachePath, 'utf8'), cached: true };
  }
  await mkdir(cacheDir, { recursive: true });
  const url = `https://www.calendar-ortodox.ro/luna/${roMonth}/${roMonth}${dd}.htm`;
  const res = await fetchWithRetry(url);
  if (!res.ok) {
    return { html: null, cached: false, status: res.status, url };
  }
  const buf = new Uint8Array(await res.arrayBuffer());
  const cs = sniffCharset(buf);
  let html;
  try {
    html = new TextDecoder(cs, { fatal: false }).decode(buf);
  } catch {
    html = new TextDecoder('utf-8').decode(buf);
  }
  if (!html || html.length < 1000) {
    return { html: null, cached: false, status: 'short', url };
  }
  await writeFile(cachePath, html);
  return { html, cached: false, url };
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const failures = [];
  let totalDays = 0;
  let totalSections = 0;
  let totalBytes = 0;

  for (const [mm, roMonth, lastDay] of MONTHS) {
    const monthOut = {};
    for (let d = 1; d <= lastDay; d++) {
      const dd = String(d).padStart(2, '0');
      const key = `${mm}-${dd}`;
      let fetched;
      try {
        fetched = await fetchCachedHtml(roMonth, dd);
      } catch (err) {
        failures.push({ key, reason: `fetch error: ${err.message}` });
        continue;
      }
      if (!fetched.cached) {
        await sleep(THROTTLE_MS);
      }
      if (!fetched.html) {
        failures.push({ key, reason: `HTTP ${fetched.status} ${fetched.url || ''}` });
        continue;
      }

      const sourceUrl = `https://www.calendar-ortodox.ro/luna/${roMonth}/${roMonth}${dd}.htm`;
      let parsed;
      try {
        parsed = parseDay(fetched.html, sourceUrl);
      } catch (err) {
        failures.push({ key, reason: `parse error: ${err.message}` });
        continue;
      }
      if (!parsed) {
        failures.push({ key, reason: 'parse returned null (no sections / 404 / short)' });
        continue;
      }
      monthOut[dd] = parsed;
      totalDays++;
      totalSections += parsed.sections.length;
    }

    const outPath = resolve(outDir, `${mm}.json`);
    const sorted = {};
    for (const k of Object.keys(monthOut).sort()) sorted[k] = monthOut[k];
    const json = JSON.stringify(sorted, null, 0);
    await writeFile(outPath, json);
    totalBytes += json.length;
    console.log(`wrote ${outPath} — ${Object.keys(sorted).length} days, ${json.length} bytes`);
  }

  if (failures.length > 0) {
    const failPath = resolve(cacheDir, '_failures.json');
    await mkdir(cacheDir, { recursive: true });
    await writeFile(failPath, JSON.stringify(failures, null, 2));
    console.log(`\n${failures.length} failures — see ${failPath}`);
  } else {
    console.log('\nno failures');
  }

  console.log(`\ntotal: ${totalDays} days, ${totalSections} sections, ${(totalBytes / 1024).toFixed(1)} KB across 12 files`);

  const expectedDays = MONTHS.reduce((n, [, , d]) => n + d, 0);
  const failureRate = failures.length / expectedDays;
  if (failureRate > 0.05) {
    console.error(`\nfailure rate ${(failureRate * 100).toFixed(1)}% exceeds 5% threshold`);
    process.exit(1);
  }
}

await main();
