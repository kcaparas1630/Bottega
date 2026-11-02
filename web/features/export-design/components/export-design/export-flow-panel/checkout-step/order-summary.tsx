import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { PrintProduct } from '@/entities/product';

import { formatPrice } from '../../../../lib/format-price';
import { ProductSilhouette } from '../../../shared/product-silhouette';

type OrderSummaryProps = {
  product: PrintProduct;
  onBack: () => void;
};

export function OrderSummary({ product, onBack }: OrderSummaryProps) {
  const price = formatPrice(product.priceCents);
  return (
    <aside className="flex flex-col gap-4 rounded-hand bg-warm-sand/60 p-5">
      <Button variant="link" size="sm" className="self-start px-0" onClick={onBack}>
        <ArrowLeft />
        Back to preview
      </Button>
      <div className="flex h-24 justify-center">
        <ProductSilhouette productId={product.id} className="h-full w-auto" />
      </div>
      <div>
        <p className="font-serif-display text-xl">{product.name}</p>
        <p className="text-[13px] text-muted-foreground">{product.description}</p>
      </div>
      <dl className="grid grid-cols-[1fr_auto] gap-y-1 border-t border-brick-ink/10 pt-3 text-sm">
        <dt>Subtotal</dt>
        <dd>{price}</dd>
        <dt>Shipping</dt>
        <dd>Free (demo)</dd>
        <dt className="font-semibold">Total</dt>
        <dd className="font-semibold">{price}</dd>
      </dl>
      <p className="text-[13px] text-muted-foreground">{product.licenseLine}</p>
    </aside>
  );
}
