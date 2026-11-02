import type { ProductId } from '@/entities/product';

// Flat product outlines drawn in inches, so each print area keeps its real proportions.
export type ProductMockup = {
  viewBox: { width: number; height: number };
  bodyPath: string;
  detailPath: string;
  detailStyle: 'outline' | 'fill';
  detailStrokeWidth: number;
  printAreaOrigin: { x: number; y: number };
};

export const PRODUCT_MOCKUPS: Record<ProductId, ProductMockup> = {
  mug: {
    viewBox: { width: 5.3, height: 4.5 },
    bodyPath: 'M0.5 0.3H3.9V3.95Q3.9 4.2 3.65 4.2H0.75Q0.5 4.2 0.5 3.95Z',
    detailPath: 'M3.9 1.05C4.95 1.05 5.05 1.45 5.05 2.15C5.05 2.85 4.95 3.25 3.9 3.25',
    detailStyle: 'outline',
    detailStrokeWidth: 0.26,
    printAreaOrigin: { x: 0.575, y: 0.5 },
  },
  't-shirt': {
    viewBox: { width: 34, height: 30 },
    bodyPath:
      'M13.5 1C14.6 3.3 19.4 3.3 20.5 1L27 2.6L33.5 9.6L29.6 12.6L27 10.6V29.4H7V10.6L4.4 12.6L0.5 9.6L7 2.6Z',
    detailPath: 'M13.5 1C14.6 3.3 19.4 3.3 20.5 1',
    detailStyle: 'outline',
    detailStrokeWidth: 0.45,
    printAreaOrigin: { x: 11, y: 5 },
  },
  'greeting-card': {
    viewBox: { width: 6, height: 7.6 },
    bodyPath: 'M0.3 0.3H5.3V7.3H0.3Z',
    detailPath: 'M0.7 0H5.7V7H5.3V0.3H0.7Z',
    detailStyle: 'fill',
    detailStrokeWidth: 0,
    printAreaOrigin: { x: 0.3, y: 0.3 },
  },
};
