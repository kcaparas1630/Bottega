import { useState } from 'react';

import { usePlaceDemoOrder } from '@/entities/order';

import type { ExportStep } from '../lib/export-steps';
import { useProductChoice } from './use-product-choice';

// Walks the export from the proof to a placed demo order.
export function useExportFlow() {
  const [step, setStep] = useState<ExportStep>('proof');
  const choice = useProductChoice();
  const {
    mutate: placeDemoOrder,
    data: placedOrder,
    isPending: isPlacingOrder,
    isError: didOrderFail,
    reset: resetOrder,
  } = usePlaceDemoOrder();

  return {
    step,
    choice,
    placedOrder: placedOrder ?? null,
    isPlacingOrder,
    didOrderFail,
    goToStep: setStep,
    placeOrder: (customerEmail: string, onPlaced: () => void) => {
      const { product, color, size, quantity } = choice;
      if (!product || !color) return;
      placeDemoOrder(
        { productId: product.id, colorId: color.id, size, quantity, customerEmail },
        {
          onSuccess: () => {
            setStep('complete');
            onPlaced();
          },
        },
      );
    },
    startOver: () => {
      resetOrder();
      setStep('proof');
    },
  };
}

export type ExportFlow = ReturnType<typeof useExportFlow>;
