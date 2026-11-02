'use client';

import { useState, type ReactNode } from 'react';

import { useExportFlow } from '../../hooks/use-export-flow';
import { useTurntable } from '../../hooks/use-turntable';
import type { DesignPicture } from '../../lib/design-picture';
import { PRODUCT_STAGING } from '../../lib/product-staging';
import { DesignPictureSource } from './proof-room/design-picture-source';
import { OrderPanel } from './proof-room/order-panel';
import { ProductStage } from './proof-room/product-stage';
import { ProofFascia } from './proof-room/proof-fascia';

type ProofRoomProps = {
  renderDesign: (widthPx: number) => ReactNode;
  onClose: () => void;
};

// The export as one proof: a fascia with the steps, the product in 3D, and the order beside it.
export function ProofRoom({ renderDesign, onClose }: ProofRoomProps) {
  const exportFlow = useExportFlow();
  const [picture, setPicture] = useState<DesignPicture>({ status: 'preparing' });
  const { product, color } = exportFlow.choice;
  const turntable = useTurntable(product ? PRODUCT_STAGING[product.id].turnLimit : 0);

  return (
    <>
      <ProofFascia currentStep={exportFlow.step} />
      <div className="grid min-h-0 flex-1 grid-rows-[minmax(20rem,48dvh)_auto] overflow-y-auto md:grid-cols-[minmax(0,1fr)_26rem] md:grid-rows-1 md:overflow-hidden">
        <ProductStage
          product={product}
          color={color}
          picture={picture}
          turntable={turntable}
          renderDesign={renderDesign}
        />
        <OrderPanel
          exportFlow={exportFlow}
          onChooseProduct={(productId) => {
            turntable.resetTurn();
            exportFlow.choice.chooseProduct(productId);
          }}
          onPlaceOrder={(customerEmail) => exportFlow.placeOrder(customerEmail, turntable.spinOnce)}
          onClose={onClose}
        />
      </div>
      {picture.status === 'preparing' && (
        <DesignPictureSource renderDesign={renderDesign} onPicture={setPicture} />
      )}
    </>
  );
}
