import type { Lang, Localized } from '../types';
import { translateName } from './names';

/**
 * Resolve a localized string. Accepts either a plain string (treated as
 * the English canonical form, with optional Romanian lookup via the legacy
 * names map) or an inline `{ en, ro? }` object.
 */
export function loc(value: Localized | undefined, lang: Lang): string {
  if (value == null) return '';
  if (typeof value === 'string') {
    return lang === 'ro' ? translateName(value, lang) : value;
  }
  if (lang === 'ro') return value.ro ?? value.en;
  return value.en;
}

// Whole-word giveaways that do not occur in genuine Romanian liturgical
// text. Verified empirically: zero hits across the 544 hand-curated
// `fixedFeasts.ts` entries, the 1801 native ext.ro entries, the moveable
// feasts, and the `names.ts` map. So any hit reliably flags pseudo-Romanian
// produced by the OCA template translator (e.g., "Great Princess din
// Moscova", "Transfer of relics din Adrian", "Sf. Ap. Andronicus din
// Seventy și său fellow-laborer").
const ENGLISH_GIVEAWAYS = [
  // articles / prepositions / conjunctions
  'the', 'of', 'and', 'with', 'by', 'for', 'from', 'or', 'to', 'at',
  'into', 'onto', 'upon', 'through', 'throughout', 'during',
  'before', 'after', 'also', 'again', 'both', 'because', 'since',
  'while', 'when', 'where',
  // pronouns
  'his', 'her', 'their', 'our', 'this', 'that', 'who', 'which', 'what',
  'they', 'them', 'him', 'those', 'whose',
  // liturgical roles / titles
  'Holy', 'Saint', 'Great', 'New', 'Old',
  'Wonderworker', 'Wonderworking',
  'Confessor', 'Stylite', 'Hermit', 'Hermitess', 'Recluse', 'Theologian',
  'Hieromartyr', 'Martyr', 'Venerable', 'Apostle', 'Prophet',
  'Synaxis', 'Repose', 'Translation', 'Discovery', 'Finding', 'Veneration',
  'Father', 'Mother', 'Son', 'Daughter', 'Brother', 'Sister', 'Disciple', 'Equal',
  'Bishop', 'Archbishop', 'Patriarch', 'Metropolitan', 'Pope',
  'Deacon', 'Priest', 'Priestmonk', 'Priestmartyr', 'Presbyter',
  'Hieromonk', 'Nun', 'Monk', 'Monastic', 'Ascetic',
  'Princess', 'King', 'Queen', 'Emperor', 'Empress', 'Prince', 'Virgin',
  'All', 'All-Praised', 'Praised', 'Glorious', 'Light', 'Beloved',
  // place qualifiers
  'Mount', 'Mountain', 'Caves', 'Cave', 'Skete', 'Monastery', 'Cell',
  'Desert', 'River', 'Lake', 'Sea', 'Forest', 'Hill', 'Wood',
  'Hut', 'Dweller', 'Icon', 'Wisdom', 'God', 'Enlightener', 'Minds',
  'Throne', 'Cross', 'Resurrection', 'Ascension', 'Transfiguration',
  'Nativity', 'Dormition', 'Annunciation', 'Baptism', 'Assembly', 'Council',
  // numbers
  'Seventy', 'Twelve', 'Forty', 'Fifty', 'Hundred', 'Thousand',
  'first', 'two', 'three', 'seven',
  // narrative verbs / nouns that mark prose left in English
  'suffered', 'tortured', 'beheaded', 'slain', 'called',
  'wife', 'soldiers', 'founder', 'children', 'parents', 'women',
  'servant', 'friend', 'former', 'others', 'many', 'under', 'relics',
  // divine names
  'Lord', 'Christ',
];

const ENGLISH_RE = new RegExp(
  '\\b(' + ENGLISH_GIVEAWAYS.join('|') + ')\\b',
  'i',
);

/**
 * Heuristic: does this string still contain obvious English words? Used to
 * detect when the template-based EN→RO translator in
 * `scripts/translateToRo.mjs` failed to produce real Romanian.
 */
export function looksEnglish(s: string): boolean {
  return ENGLISH_RE.test(s);
}
