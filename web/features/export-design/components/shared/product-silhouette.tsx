import type { ProductId } from '@/entities/product';
import { cn } from '@/shared/lib/cn';

import { PRODUCT_MOCKUPS } from '../../lib/product-mockups';

const OUTLINE_COLOR = 'color-mix(in oklab, var(--brick-ink) 30%, transparent)';

type ProductSilhouetteProps = {
  productId: ProductId;
  className?: string;
};

// A product's flat outline, for picker tiles and the full-size preview.
export function ProductSilhouette({ productId, className }: ProductSilhouetteProps) {
  const mockup = PRODUCT_MOCKUPS[productId];
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${mockup.viewBox.width} ${mockup.viewBox.height}`}
      className={cn('block size-full overflow-visible', className)}
    >
      {mockup.detailStyle === 'fill' && (
        <path
          d={mockup.detailPath}
          fill="var(--warm-sand)"
          stroke={OUTLINE_COLOR}
          strokeWidth={0.025}
        />
      )}
      <path
        d={mockup.bodyPath}
        fill="var(--card)"
        stroke={OUTLINE_COLOR}
        strokeWidth={mockup.viewBox.width / 260}
        strokeLinejoin="round"
      />
      {mockup.detailStyle === 'outline' && (
        <path
          d={mockup.detailPath}
          fill="none"
          stroke={OUTLINE_COLOR}
          strokeWidth={mockup.detailStrokeWidth}
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
