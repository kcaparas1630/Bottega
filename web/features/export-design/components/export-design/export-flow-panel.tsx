import type { ReactNode } from 'react';

import { CheckoutStep } from './export-flow-panel/checkout-step';
import { ExportStepper } from './export-flow-panel/export-stepper';
import { PreviewStep } from './export-flow-panel/preview-step';
import { ProductStep } from './export-flow-panel/product-step';
import { SuccessStep } from './export-flow-panel/success-step';
import { useExportFlow } from '../../hooks/use-export-flow';

type ExportFlowPanelProps = {
  renderDesign: (widthPx: number) => ReactNode;
  onClose: () => void;
};

export function ExportFlowPanel({ renderDesign, onClose }: ExportFlowPanelProps) {
  const exportFlow = useExportFlow();
  const { step, selectedProduct, placedOrder } = exportFlow;
  return (
    <div className="flex flex-col gap-6">
      <ExportStepper currentStep={step} />
      {step === 'pick-product' && (
        <ProductStep
          products={exportFlow.products}
          isLoading={exportFlow.isLoadingProducts}
          onChooseProduct={exportFlow.chooseProduct}
        />
      )}
      {step === 'preview' && selectedProduct && (
        <PreviewStep
          product={selectedProduct}
          renderDesign={renderDesign}
          onBackToCanvas={onClose}
          onChangeProduct={() => exportFlow.goToStep('pick-product')}
          onContinue={() => exportFlow.goToStep('checkout')}
        />
      )}
      {step === 'checkout' && selectedProduct && (
        <CheckoutStep
          product={selectedProduct}
          isPlacingOrder={exportFlow.isPlacingOrder}
          didOrderFail={exportFlow.didOrderFail}
          onPlaceOrder={exportFlow.placeOrder}
          onBack={() => exportFlow.goToStep('preview')}
        />
      )}
      {step === 'complete' && placedOrder && (
        <SuccessStep
          placedOrder={placedOrder}
          onBackToCanvas={onClose}
          onStartOver={exportFlow.startOver}
        />
      )}
    </div>
  );
}
