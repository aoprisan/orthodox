// Parser for calendar-ortodox.ro per-day pages.
//
//   /luna/{ro-month}/{ro-month}{DD}.htm
//
// Each page is legacy table HTML, UTF-8, with diacritics encoded as named
// HTML entities (&icirc; &acirc; &nbsp; ...). Saint sections are flagged
// with <p class="subtitlu">; the page closes with a red-italic prayer
// "Cu ale lor sfinte rugăciuni...".

const NAMED_ENTITIES = {
  Acirc: 'Â', acirc: 'â',
  Icirc: 'Î', icirc: 'î',
  Aacute: 'Á', aacute: 'á',
  Eacute: 'É', eacute: 'é',
  Iacute: 'Í', iacute: 'í',
  Oacute: 'Ó', oacute: 'ó',
  Uacute: 'Ú', uacute: 'ú',
  Auml: 'Ä', auml: 'ä',
  Euml: 'Ë', euml: 'ë',
  Iuml: 'Ï', iuml: 'ï',
  Ouml: 'Ö', ouml: 'ö',
  Uuml: 'Ü', uuml: 'ü',
  Atilde: 'Ã', atilde: 'ã',
  Otilde: 'Õ', otilde: 'õ',
  Ntilde: 'Ñ', ntilde: 'ñ',
  Agrave: 'À', agrave: 'à',
  Egrave: 'È', egrave: 'è',
  Igrave: 'Ì', igrave: 'ì',
  Ograve: 'Ò', ograve: 'ò',
  Ugrave: 'Ù', ugrave: 'ù',
  scaron: 'š', Scaron: 'Š',
  tcedil: 'ţ', Tcedil: 'Ţ',
  scedil: 'ş', Scedil: 'Ş',
  abreve: 'ă', Abreve: 'Ă',
  ccedil: 'ç', Ccedil: 'Ç',
  // Punctuation / whitespace / symbols
  nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'",
  middot: '·', hellip: '…', mdash: '—', ndash: '–',
  laquo: '«', raquo: '»',
  ldquo: '“', rdquo: '”', lsquo: '‘', rsquo: '’',
  bdquo: '„', sbquo: '‚',
  sect: '§', deg: '°', para: '¶',
  copy: '©', reg: '®', trade: '™',
  ouml2: 'ö',
};

export function decodeEntities(s) {
  s = s.replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)));
  s = s.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)));
  s = s.replace(/&([a-zA-Z]+);/g, (m, name) =>
    Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, name) ? NAMED_ENTITIES[name] : m,
  );
  // Canonicalize Romanian comma-below diacritics (match src/lib/feasts.ts:124).
  s = s
    .replace(/ş/g, 'ș').replace(/Ş/g, 'Ș')
    .replace(/ţ/g, 'ț').replace(/Ţ/g, 'Ț');
  return s;
}

function stripTags(s) {
  s = s.replace(/<img\b[^>]*>/gi, '');
  s = s.replace(/<[^>]+>/g, ' ');
  return s;
}

function normalizeWhitespace(s) {
  return s.replace(/[ \s]+/g, ' ').trim();
}

function cleanText(raw) {
  let s = stripTags(raw);
  s = decodeEntities(s);
  return normalizeWhitespace(s);
}

function findClosing(html, afterPos) {
  // The page-end prayer: a <P> with inline italic style containing "rugăciuni".
  const re = /<p\b[^>]*style="[^"]*font-style\s*:\s*italic[^"]*"[^>]*>([\s\S]*?)<\/p>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    if (m.index < afterPos) continue;
    const text = cleanText(m[1]);
    if (/rug[ăa]ciuni/i.test(text)) {
      return { text, pos: m.index };
    }
  }
  return null;
}

export function parseDay(html, sourceUrl) {
  if (!html || typeof html !== 'string') return null;
  if (/<title>\s*404\b/i.test(html)) return null;
  if (html.length < 1000) return null;

  html = html.replace(/<!--[\s\S]*?-->/g, '');
  html = html.replace(/<head\b[\s\S]*?<\/head>/gi, '');
  html = html.replace(/<script\b[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<style\b[\s\S]*?<\/style>/gi, '');

  // Section heads are usually <P class="subtitlu"> but a few pages (e.g.,
  // martie25.htm — the Annunciation) use <H2 class="subtitlu"> instead.
  // Match either; backreference \1 with /i flag tolerates mixed case.
  const headRe = /<(p|h\d)\b[^>]*class="[^"]*subtitlu[^"]*"[^>]*>([\s\S]*?)<\/\1>/gi;
  const heads = [];
  let hm;
  while ((hm = headRe.exec(html)) !== null) {
    heads.push({ start: hm.index, end: hm.index + hm[0].length, inner: hm[2] });
  }
  if (heads.length === 0) return null;

  const closing = findClosing(html, heads[heads.length - 1].end);
  const closingPos = closing ? closing.pos : html.length;

  const sections = [];
  for (let i = 0; i < heads.length; i++) {
    const head = heads[i];
    const nextStart = i + 1 < heads.length ? heads[i + 1].start : closingPos;

    const anchorMatch = /<a\b[^>]*name\s*=\s*"([^"]+)"/i.exec(head.inner);
    const anchor = anchorMatch ? anchorMatch[1] : undefined;

    const title = cleanText(head.inner);
    if (!title) continue;

    const bodyHtml = html.slice(head.end, nextStart);
    const paragraphs = [];
    // Some pages leave the final <P> of a section unclosed before the next
    // section head (e.g. mai24, noiembrie04), so a strict <p>...</p> match
    // silently drops that paragraph. Split on opening <p> tags instead: each
    // chunk runs until its own </p> if present, otherwise until the next
    // opening <p> (the split boundary) or the section body's end.
    const chunks = bodyHtml.split(/<p\b[^>]*>/i);
    for (let k = 1; k < chunks.length; k++) {
      let chunk = chunks[k];
      const close = chunk.search(/<\/p>/i);
      if (close !== -1) chunk = chunk.slice(0, close);
      const text = cleanText(chunk);
      if (text.length >= 5) paragraphs.push(text);
    }

    sections.push(anchor ? { title, paragraphs, anchor } : { title, paragraphs });
  }

  if (sections.length === 0) return null;

  const totalProse = sections.reduce(
    (n, s) => n + s.title.length + s.paragraphs.reduce((a, p) => a + p.length, 0),
    0,
  );
  if (totalProse < 200) return null;

  const allText = [
    closing ? closing.text : '',
    ...sections.flatMap((s) => [s.title, ...s.paragraphs]),
  ].join(' ');
  const residual = allText.match(/&[a-zA-Z]+;/g);
  if (residual && residual.length > 0) {
    throw new Error(`Residual entities after decode: ${[...new Set(residual)].join(', ')}`);
  }

  return {
    sections,
    ...(closing ? { closing: closing.text } : {}),
    sourceUrl,
  };
}
