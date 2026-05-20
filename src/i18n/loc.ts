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
