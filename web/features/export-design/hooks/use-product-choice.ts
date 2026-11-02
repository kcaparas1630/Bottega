import { useState } from 'react';

import { useCanvasStore } from '@/entities/canvas';
import { useListProducts, type ProductId } from '@/entities/product';

import { findBestFitProduct } from '../lib/print-fit';

const PREFERRED_SIZE = 'M';

// The product, colour, size and quantity on the proof; it opens on the product that fits the design best.
export function useProductChoice() {
  const { data: products = [], isPending: isLoadingProducts } = useListProducts();
  const designAspect = useCanvasStore((state) =>
    state.design ? state.design.width / state.design.height : 1,
  );
  const [chosenProductId, setChosenProductId] = useState<ProductId | null>(null);
  const [colorIds, setColorIds] = useState<Partial<Record<ProductId, string>>>({});
  const [sizes, setSizes] = useState<Partial<Record<ProductId, string>>>({});
  const [chosenQuantity, setChosenQuantity] = useState(1);

  const product =
    products.find((candidate) => candidate.id === chosenProductId) ??
    findBestFitProduct(products, designAspect);
  const color =
    product?.colors.find((candidate) => candidate.id === colorIds[product.id]) ??
    product?.colors[0] ??
    null;
  const defaultSize = product?.sizes.includes(PREFERRED_SIZE) ? PREFERRED_SIZE : product?.sizes[0];
  const hasSizes = Boolean(product && product.sizes.length > 0);
  const size = hasSizes && product ? (sizes[product.id] ?? defaultSize ?? null) : null;
  const quantity = Math.min(chosenQuantity, product?.maxQuantity ?? 1);

  return {
    products,
    isLoadingProducts,
    designAspect,
    product,
    color,
    size,
    quantity,
    chooseProduct: setChosenProductId,
    chooseColor: (colorId: string) => {
      if (product) setColorIds((current) => ({ ...current, [product.id]: colorId }));
    },
    chooseSize: (sizeName: string) => {
      if (product) setSizes((current) => ({ ...current, [product.id]: sizeName }));
    },
    chooseQuantity: setChosenQuantity,
  };
}

export type ProductChoice = ReturnType<typeof useProductChoice>;
