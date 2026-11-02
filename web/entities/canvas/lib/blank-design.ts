import type { CanvasDesign } from '@bottega/server';

import { PALETTE_COLORS } from '@/shared/config/palette-colors';

import { PAGE_SIZE_PRESETS } from './page-size-presets';

// A fresh, empty page: square, Mortar Cream, no elements, not yet saved anywhere.
export function createBlankDesign(designId: string): CanvasDesign {
  const squarePage = PAGE_SIZE_PRESETS[0];
  return {
    id: designId,
    name: 'Untitled canvas',
    width: squarePage.width,
    height: squarePage.height,
    paperColor: PALETTE_COLORS['mortar-cream'].hex,
    elements: [],
  };
}
