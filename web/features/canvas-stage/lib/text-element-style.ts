import type { CSSProperties } from 'react';

import { fontFamilyStyle, type TextElement } from '@/entities/canvas';

// The same type styling for reading text on the paper and for editing it in place.
export function textElementStyle(element: TextElement): CSSProperties {
  return {
    ...fontFamilyStyle(element.fontFamily, element.fontWeight),
    fontSize: element.fontSize,
    textAlign: element.align,
    color: element.color,
  };
}
