'use client';

import { Rotate3d } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState, type ReactNode } from 'react';

import type { PrintProduct, ProductColor } from '@/entities/product';

import type { Turntable } from '../../../hooks/use-turntable';
import type { DesignPicture } from '../../../lib/design-picture';
import { detectWebGl } from '../../../lib/detect-webgl';
import { FlatProof } from './product-stage/flat-proof';

const ProductScene = dynamic(
  () => import('../../shared/product-scene').then((module) => module.ProductScene),
  { ssr: false },
);

type ProductStageProps = {
  product: PrintProduct | null;
  color: ProductColor | null;
  picture: DesignPicture;
  turntable: Turntable;
  renderDesign: (widthPx: number) => ReactNode;
};

// The stage: the product in 3D straight away, the design fading onto it once it is ready; drag to turn.
export function ProductStage({
  product,
  color,
  picture,
  turntable,
  renderDesign,
}: ProductStageProps) {
  const [canDraw3d] = useState(detectWebGl);
  const isFlat = !canDraw3d || picture.status === 'failed';
  return (
    <section
      aria-label="Proof"
      className="relative min-h-0 overflow-hidden bg-warm-sand bg-[radial-gradient(58%_52%_at_50%_44%,rgb(255_255_255/0.5),transparent_72%)]"
    >
      {isFlat && <FlatProof renderDesign={renderDesign} />}
      {!isFlat && product && color && (
        <>
          <div
            role="slider"
            tabIndex={0}
            aria-label={`Turn the ${product.name.toLowerCase()}`}
            aria-valuemin={0}
            aria-valuemax={359}
            aria-valuenow={turntable.degrees}
            aria-valuetext={`${turntable.degrees} degrees`}
            className="absolute inset-0 cursor-grab touch-pan-y outline-none focus-visible:ring-2 focus-visible:ring-shop-green/50 focus-visible:ring-inset active:cursor-grabbing"
            {...turntable.stageHandlers}
          >
            <ProductScene
              product={product}
              colorHex={color.hex}
              picture={picture.status === 'ready' ? picture.canvas : null}
              turnRef={turntable.turnRef}
            />
          </div>
          <p className="pointer-events-none absolute inset-x-0 bottom-5 flex items-center justify-center gap-2 text-[13px] text-brick-ink/55">
            <Rotate3d className="size-4" aria-hidden />
            Drag to turn the {product.name.toLowerCase()}
          </p>
        </>
      )}
    </section>
  );
}
