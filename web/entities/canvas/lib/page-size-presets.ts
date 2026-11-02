// Page sizes in design units; the short side stays 1000 so type sizes mean the same on every page.
export const PAGE_SIZE_PRESETS = [
  { name: 'square', label: 'Square', ratioLabel: '1:1', width: 1000, height: 1000 },
  { name: 'portrait', label: 'Portrait', ratioLabel: '4:5', width: 1000, height: 1250 },
  { name: 'card', label: 'Card', ratioLabel: '5:7', width: 1000, height: 1400 },
  { name: 'landscape', label: 'Landscape', ratioLabel: '3:2', width: 1500, height: 1000 },
] as const;

export type PageSizePreset = (typeof PAGE_SIZE_PRESETS)[number];
