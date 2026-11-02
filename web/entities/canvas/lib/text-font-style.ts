import type { CSSProperties } from 'react';

// Fraunces and Instrument Sans are self-hosted by next/font; Fraunces keeps its soft, wonky axes on the page.
const HOUSE_FONT_STYLES: Record<string, CSSProperties> = {
  Fraunces: {
    fontFamily: 'var(--font-display)',
    fontVariationSettings: "'SOFT' 100, 'WONK' 1",
    lineHeight: 1.05,
  },
  'Instrument Sans': { fontFamily: 'var(--font-sans)', lineHeight: 1.25 },
};

export const HOUSE_FONT_FAMILIES = Object.keys(HOUSE_FONT_STYLES);

export function isHouseFont(fontFamily: string) {
  return Object.hasOwn(HOUSE_FONT_STYLES, fontFamily);
}

// The CSS for a family and weight; any family that is not a house font comes from Google Fonts.
export function fontFamilyStyle(fontFamily: string, fontWeight: number): CSSProperties {
  const houseStyle = HOUSE_FONT_STYLES[fontFamily];
  if (houseStyle) return { ...houseStyle, fontWeight };
  return { fontFamily: `'${fontFamily}', system-ui, sans-serif`, fontWeight, lineHeight: 1.15 };
}
