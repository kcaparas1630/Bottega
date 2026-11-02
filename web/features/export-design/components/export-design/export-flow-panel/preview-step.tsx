import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import type { PrintProduct } from '@/entities/product';
import { PaperTag } from '@/shared/ui/paper-tag';

import { formatPrice } from '../../../lib/format-price';
import { ProductMockup } from './preview-step/product-mockup';

type PreviewStepProps = {
  product: PrintProduct;
  renderDesign: (widthPx: number) => ReactNode;
  onBackToCanvas: () => void;
  onChangeProduct: () => void;
  onContinue: () => void;
};

export function PreviewStep({
  product,
  renderDesign,
  onBackToCanvas,
  onChangeProduct,
  onContinue,
}: PreviewStepProps) {
  const { widthInches, heightInches } = product.printArea;
  return (
    <section className="grid animate-paper-settle gap-6 md:grid-cols-[1fr_17rem]">
      <div className="flex flex-col items-center justify-end rounded-hand bg-warm-sand/60 px-8 pt-10 pb-5">
        <ProductMockup product={product} renderDesign={renderDesign} />
        <span aria-hidden className="mt-1 h-2 w-4/5 rounded-full bg-clay/45 shadow-paper" />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-2xl">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
        <PaperTag tone="mustard" className="self-start text-sm">
          {formatPrice(product.priceCents)}
        </PaperTag>
        <p className="text-sm">
          <span className="font-medium">
            Print area {widthInches} × {heightInches} in.
          </span>{' '}
          The dashed line is the edge; anything faded falls outside it.
        </p>
        <p className="border-t border-brick-ink/10 pt-3 text-[13px] text-muted-foreground">
          {product.licenseLine}
        </p>
        <div className="mt-auto flex flex-col gap-2">
          <Button onClick={onContinue}>Continue to checkout</Button>
          <Button variant="outline" onClick={onBackToCanvas}>
            <ArrowLeft />
            Back to canvas
          </Button>
          <Button variant="link" size="sm" onClick={onChangeProduct}>
            Choose a different product
          </Button>
        </div>
      </div>
    </section>
  );
}
