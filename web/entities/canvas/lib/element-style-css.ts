import type { ImageFilter, ShapeKind } from '@bottega/server';

// CSS filter per photo treatment; export and print must apply the same values.
export const IMAGE_FILTER_CSS: Record<ImageFilter, string> = {
  none: 'none',
  warm: 'sepia(0.28) saturate(1.2) hue-rotate(-8deg) brightness(1.03)',
  mono: 'grayscale(1) contrast(1.08)',
  faded: 'saturate(0.62) contrast(0.86) brightness(1.08)',
};

// Radii in design units; oversized radii clamp, which turns the arch top into a half circle.
export const SHAPE_BORDER_RADIUS: Record<ShapeKind, string> = {
  rectangle: '0',
  rounded: '48px',
  ellipse: '50%',
  arch: '9999px 9999px 0 0',
};
