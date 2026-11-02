// The locked Bricks Bodega palette; designs may use any colour, these are the house presets.
export const PALETTE_COLORS = {
  'mortar-cream': { label: 'Mortar cream', hex: '#F5EDE1' },
  'brick-ink': { label: 'Brick ink', hex: '#2A2320' },
  'brick-red': { label: 'Brick red', hex: '#A64B32' },
  clay: { label: 'Clay', hex: '#C96F4A' },
  'shop-green': { label: 'Shop green', hex: '#2E4B3F' },
  mustard: { label: 'Mustard', hex: '#E3A82B' },
  'warm-sand': { label: 'Warm sand', hex: '#E8DCC8' },
} as const;

export type PaletteColorName = keyof typeof PALETTE_COLORS;

export const PALETTE_COLOR_NAMES = Object.keys(PALETTE_COLORS) as PaletteColorName[];
