import type { ProductId } from '@/entities/product';

import type { ExportFlow } from '../../../hooks/use-export-flow';
import { CheckoutForm } from './order-panel/checkout-form';
import { OrderReceipt } from './order-panel/order-receipt';
import { ProductOptions } from './order-panel/product-options';

type OrderPanelProps = {
  exportFlow: ExportFlow;
  onChooseProduct: (productId: ProductId) => void;
  onPlaceOrder: (customerEmail: string) => void;
  onClose: () => void;
};

// The order beside the stage: options on the proof, then the demo checkout, then the receipt.
export function OrderPanel({
  exportFlow,
  onChooseProduct,
  onPlaceOrder,
  onClose,
}: OrderPanelProps) {
  const { step, choice, placedOrder } = exportFlow;
  return (
    <aside
      aria-label="Your order"
      className="flex min-h-0 flex-col border-t border-brick-ink/10 bg-mortar-cream md:overflow-y-auto md:border-t-0 md:border-l"
    >
      {step === 'proof' && (
        <ProductOptions
          choice={choice}
          onChooseProduct={onChooseProduct}
          onContinue={() => exportFlow.goToStep('checkout')}
        />
      )}
      {step === 'checkout' && (
        <CheckoutForm
          choice={choice}
          isPlacingOrder={exportFlow.isPlacingOrder}
          didOrderFail={exportFlow.didOrderFail}
          onPlaceOrder={onPlaceOrder}
          onBack={() => exportFlow.goToStep('proof')}
        />
      )}
      {step === 'complete' && placedOrder && (
        <OrderReceipt
          placedOrder={placedOrder}
          onBackToCanvas={onClose}
          onStartOver={exportFlow.startOver}
        />
      )}
    </aside>
  );
}
