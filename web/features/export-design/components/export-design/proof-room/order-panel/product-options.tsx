import { Button } from '@/components/ui/button';
import type { ProductId } from '@/entities/product';
import { SegmentedControl } from '@/shared/ui/segmented-control';

import type { ProductChoice } from '../../../../hooks/use-product-choice';
import { formatPrice } from '../../../../lib/format-price';
import { ColorSwatches } from './product-options/color-swatches';
import { PrintFitNote } from './product-options/print-fit-note';
import { ProductPicker } from './product-options/product-picker';
import { QuantityStepper } from './product-options/quantity-stepper';
import { OptionLabel } from './shared/option-label';

type ProductOptionsProps = {
  choice: ProductChoice;
  onChooseProduct: (productId: ProductId) => void;
  onContinue: () => void;
};

// The proof's options: which product, its colour and size, how many, how the design fits, and the total.
export function ProductOptions({ choice, onChooseProduct, onContinue }: ProductOptionsProps) {
  const { product, color, size, quantity } = choice;
  if (!product || !color) {
    return <p className="p-6 text-sm text-muted-foreground">Bringing the goods out…</p>;
  }
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-6 p-6">
        <ProductPicker products={choice.products} value={product.id} onChange={onChooseProduct} />
        <div key={product.id} className="animate-paper-settle">
          <h3 className="text-[28px] leading-tight">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
        </div>
        <ColorSwatches
          label={product.colorLabel}
          colors={product.colors}
          value={color.id}
          onChange={choice.chooseColor}
        />
        {size && (
          <div className="grid gap-2.5">
            <OptionLabel label="Size" value={size} />
            <SegmentedControl
              ariaLabel="Size"
              value={size}
              options={product.sizes.map((sizeName) => ({ value: sizeName, label: sizeName }))}
              onChange={choice.chooseSize}
            />
          </div>
        )}
        <QuantityStepper
          value={quantity}
          max={product.maxQuantity}
          onChange={choice.chooseQuantity}
        />
        <PrintFitNote product={product} designAspect={choice.designAspect} />
      </div>
      <div className="sticky bottom-0 mt-auto flex flex-col gap-3 border-t border-brick-ink/10 bg-mortar-cream px-6 pt-4 pb-5">
        <p className="flex items-baseline justify-between">
          <span className="label-caps text-muted-foreground">Total</span>
          <span className="font-serif-display text-3xl tabular-nums">
            {formatPrice(product.priceCents * quantity)}
          </span>
        </p>
        <Button size="lg" className="h-12 text-[15px]" onClick={onContinue}>
          Continue to checkout
        </Button>
        <p className="text-center text-xs text-muted-foreground">{product.licenseLine}</p>
      </div>
    </div>
  );
}
