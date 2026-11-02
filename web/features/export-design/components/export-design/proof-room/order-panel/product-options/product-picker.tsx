import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { PrintProduct, ProductId } from '@/entities/product';

import { formatPrice } from '../../../../../lib/format-price';

type ProductPickerProps = {
  products: readonly PrintProduct[];
  value: ProductId;
  onChange: (productId: ProductId) => void;
};

// One of the shop's products, each with its price; the chosen one is filled in ink.
export function ProductPicker({ products, value, onChange }: ProductPickerProps) {
  return (
    <ToggleGroup
      type="single"
      spacing={1}
      aria-label="Product"
      value={value}
      onValueChange={(chosenValue) => {
        const chosenProduct = products.find((product) => product.id === chosenValue);
        if (chosenProduct) onChange(chosenProduct.id);
      }}
      className="grid w-full grid-cols-3 rounded-lg border border-brick-ink/20 bg-white/50 p-1"
    >
      {products.map((product) => (
        <ToggleGroupItem
          key={product.id}
          value={product.id}
          className="h-auto w-full flex-col gap-0.5 rounded-md px-2 py-2.5 text-brick-ink/70 hover:bg-brick-ink/8 hover:text-brick-ink focus-visible:ring-2 focus-visible:ring-shop-green/40 data-[state=on]:bg-brick-ink data-[state=on]:text-mortar-cream data-[state=on]:hover:bg-brick-ink"
        >
          <span className="text-sm font-medium">{product.name}</span>
          <span className="text-xs tabular-nums opacity-75">{formatPrice(product.priceCents)}</span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
