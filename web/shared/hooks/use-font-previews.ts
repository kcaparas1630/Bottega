import { useEffect } from 'react';

import { googleFontStylesheetUrl, type FontRequest } from './use-google-fonts';

const loadedPreviews = new Set<string>();

// Previews live under their own name, so a glyph subset never shadows the full font on the page.
export function previewFamilyName(family: string) {
  return `${family} Preview`;
}

async function loadPreview(font: FontRequest) {
  const response = await fetch(googleFontStylesheetUrl(font, font.family));
  const fontUrl = /url\((https:[^)]+)\)/.exec(await response.text())?.[1];
  if (!fontUrl) return;
  const fontFace = new FontFace(previewFamilyName(font.family), `url(${fontUrl})`, {
    weight: String(font.weight),
  });
  document.fonts.add(await fontFace.load());
}

// Loads just the letters of each family's own name, enough to show the name in its face.
export function useFontPreviews(fonts: readonly FontRequest[]) {
  const previewKey = fonts.map((font) => `${font.family}:${font.weight}`).join('|');
  useEffect(() => {
    for (const fontKey of previewKey.split('|')) {
      const [family, weight] = fontKey.split(':');
      if (!family || !weight || loadedPreviews.has(fontKey)) continue;
      loadedPreviews.add(fontKey);
      loadPreview({ family, weight: Number(weight) }).catch(() => loadedPreviews.delete(fontKey));
    }
  }, [previewKey]);
}
