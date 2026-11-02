import type { PrintProduct, ProductId } from '@/entities/product';

import { ComingSoonTile } from './product-step/coming-soon-tile';
import { ProductTile } from './product-step/product-tile';

type ProductStepProps = {
  products: readonly PrintProduct[];
  isLoading: boolean;
  onChooseProduct: (productId: ProductId) => void;
};

export function ProductStep({ products, isLoading, onChooseProduct }: ProductStepProps) {
  return (
    <section className="flex animate-paper-settle flex-col gap-4">
      <h3 className="text-2xl">Choose what to print on.</h3>
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Bringing the goods out…</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.map((product) => (
            <li key={product.id}>
              <ProductTile product={product} onChoose={() => onChooseProduct(product.id)} />
            </li>
          ))}
          <li>
            <ComingSoonTile />
          </li>
        </ul>
      )}
    </section>
  );
}
