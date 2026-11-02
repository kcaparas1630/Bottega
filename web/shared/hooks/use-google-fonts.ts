import { useEffect } from 'react';

const GOOGLE_FONTS_CSS = 'https://fonts.googleapis.com/css2';

export type FontRequest = { family: string; weight: number };

const requestedStylesheets = new Set<string>();

// The Google Fonts CSS URL for one family and weight; text limits it to the glyphs needed.
export function googleFontStylesheetUrl({ family, weight }: FontRequest, text?: string) {
  const familyParam = encodeURIComponent(family).replaceAll('%20', '+');
  const weightParam = weight === 400 ? '' : `:wght@${weight}`;
  const textParam = text ? `&text=${encodeURIComponent(text)}` : '';
  return `${GOOGLE_FONTS_CSS}?family=${familyParam}${weightParam}${textParam}&display=swap`;
}

function appendStylesheet(href: string) {
  if (requestedStylesheets.has(href)) return;
  requestedStylesheets.add(href);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.append(link);
}

// Loads the full fonts a design uses, one stylesheet per family, each only once per page.
export function useGoogleFonts(fonts: readonly FontRequest[]) {
  const stylesheetKey = fonts.map((font) => googleFontStylesheetUrl(font)).join('\n');
  useEffect(() => {
    for (const href of stylesheetKey.split('\n')) {
      if (href) appendStylesheet(href);
    }
  }, [stylesheetKey]);
}
