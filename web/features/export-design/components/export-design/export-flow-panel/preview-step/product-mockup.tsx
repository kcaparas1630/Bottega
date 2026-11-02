import type { ReactNode } from 'react';

import { useCanvasStore } from '@/entities/canvas';
import type { PrintProduct } from '@/entities/product';
import { useElementSize } from '@/shared/hooks/use-element-size';

import { PRODUCT_MOCKUPS } from '../../../../lib/product-mockups';
import { ProductSilhouette } from '../../../shared/product-silhouette';

type ProductMockupProps = {
  product: PrintProduct;
  renderDesign: (widthPx: number) => ReactNode;
};

function toPercent(inches: number, totalInches: number) {
  return `${(inches / totalInches) * 100}%`;
}

// The design covers the print area at true scale; what falls outside shows faded, so bad fits are visible.
export function ProductMockup({ product, renderDesign }: ProductMockupProps) {
  const mockup = PRODUCT_MOCKUPS[product.id];
  const designAspectRatio = useCanvasStore((state) =>
    state.design ? state.design.width / state.design.height : 1,
  );
  const { measureRef, size } = useElementSize();
  const { widthInches, heightInches } = product.printArea;
  const isDesignWiderThanPrintArea = designAspectRatio > widthInches / heightInches;
  const designWidthPx = isDesignWiderThanPrintArea ? size.height * designAspectRatio : size.width;

  return (
    <div
      className="relative max-w-full"
      style={{
        aspectRatio: `${mockup.viewBox.width} / ${mockup.viewBox.height}`,
        height: 'min(46vh, 22rem)',
      }}
    >
      <ProductSilhouette productId={product.id} />
      <div
        ref={measureRef}
        className="absolute"
        style={{
          left: toPercent(mockup.printAreaOrigin.x, mockup.viewBox.width),
          top: toPercent(mockup.printAreaOrigin.y, mockup.viewBox.height),
          width: toPercent(widthInches, mockup.viewBox.width),
          height: toPercent(heightInches, mockup.viewBox.height),
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-25"
        >
          {renderDesign(designWidthPx)}
        </div>
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {renderDesign(designWidthPx)}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 border border-dashed border-brick-ink/50"
        />
      </div>
    </div>
  );
}
