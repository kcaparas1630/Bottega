import { Button } from '@/components/ui/button';
import type { PrintProduct } from '@/entities/product';
import { PaperTag } from '@/shared/ui/paper-tag';

import { formatPrice } from '../../../../lib/format-price';
import { ProductSilhouette } from '../../../shared/product-silhouette';

type ProductTileProps = {
  product: PrintProduct;
  onChoose: () => void;
};

// A product set out on the shelf, with its price tag.
export function ProductTile({ product, onChoose }: ProductTileProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onChoose}
      className="group flex size-full h-auto flex-col items-center gap-3 rounded-hand bg-warm-sand/60 px-4 pt-5 pb-4 font-normal whitespace-normal transition duration-300 ease-settle outline-none hover:-translate-y-1 hover:bg-warm-sand hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="flex h-28 w-full items-end justify-center">
        <ProductSilhouette productId={product.id} className="h-full w-auto" />
      </span>
      <span aria-hidden className="-mt-2 h-1.5 w-full rounded-full bg-clay/45 shadow-paper" />
      <span className="font-serif-display text-xl">{product.name}</span>
      <PaperTag>{formatPrice(product.priceCents)}</PaperTag>
    </Button>
  );
}
