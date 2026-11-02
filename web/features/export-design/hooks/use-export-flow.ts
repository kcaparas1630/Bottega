import { useState } from 'react';

import { usePlaceDemoOrder } from '@/entities/order';
import { useListProducts, type ProductId } from '@/entities/product';

import type { ExportStep } from '../lib/export-steps';

// Walks the export from product choice to a placed demo order.
export function useExportFlow() {
  const [step, setStep] = useState<ExportStep>('pick-product');
  const [selectedProductId, setSelectedProductId] = useState<ProductId | null>(null);
  const { data: products = [], isPending: isLoadingProducts } = useListProducts();
  const {
    mutate: placeDemoOrder,
    data: placedOrder,
    isPending: isPlacingOrder,
    isError: didOrderFail,
    reset: resetOrder,
  } = usePlaceDemoOrder();
  const selectedProduct = products.find((product) => product.id === selectedProductId) ?? null;

  return {
    step,
    products,
    isLoadingProducts,
    selectedProduct,
    placedOrder: placedOrder ?? null,
    isPlacingOrder,
    didOrderFail,
    goToStep: setStep,
    chooseProduct: (productId: ProductId) => {
      setSelectedProductId(productId);
      setStep('preview');
    },
    placeOrder: (customerEmail: string) => {
      if (!selectedProduct) return;
      placeDemoOrder(
        { productId: selectedProduct.id, customerEmail },
        { onSuccess: () => setStep('complete') },
      );
    },
    startOver: () => {
      resetOrder();
      setSelectedProductId(null);
      setStep('pick-product');
    },
  };
}
