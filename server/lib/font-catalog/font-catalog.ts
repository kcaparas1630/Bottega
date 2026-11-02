import { z } from 'zod';

import googleFontRecords from './google-fonts.json';

export const FONT_CATEGORIES = [
  'serif',
  'sans-serif',
  'display',
  'handwriting',
  'monospace',
] as const;
export type FontCategory = (typeof FONT_CATEGORIES)[number];

export type CatalogFont = {
  family: string;
  category: FontCategory;
  // The weight to load when nothing else is asked for: 400, or the nearest the family has.
  defaultWeight: number;
};

// Snapshot of fonts.google.com/metadata/fonts, most popular first; see docs/adr/014.
const CATALOG: readonly CatalogFont[] = z
  .tuple([z.string(), z.enum(FONT_CATEGORIES), z.number().int()])
  .array()
  .parse(googleFontRecords)
  .map(([family, category, defaultWeight]) => ({ family, category, defaultWeight }));

type FontSearch = { query: string; category?: FontCategory; limit: number };

// Families whose name contains the query, in one category or all, most popular first.
export function searchFonts({ query, category, limit }: FontSearch) {
  const normalisedQuery = query.trim().toLowerCase();
  const matches = CATALOG.filter(
    (font) =>
      (!category || font.category === category) &&
      font.family.toLowerCase().includes(normalisedQuery),
  );
  return { fonts: matches.slice(0, limit), total: matches.length };
}
