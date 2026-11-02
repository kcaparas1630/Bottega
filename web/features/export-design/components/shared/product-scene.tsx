'use client';

import { Canvas } from '@react-three/fiber';
import type { RefObject } from 'react';
import { NeutralToneMapping } from 'three';

import type { PrintProduct } from '@/entities/product';

import type { TurnTarget } from '../../hooks/use-turntable';
import { PRODUCT_STAGING } from '../../lib/product-staging';
import { CardModel } from './product-scene/card-model';
import { FloorShadow } from './product-scene/floor-shadow';
import { MugModel } from './product-scene/mug-model';
import { StudioLighting } from './product-scene/studio-lighting';
import { TeeModel } from './product-scene/tee-model';
import { Turntable } from './product-scene/turntable';

type ProductSceneProps = {
  product: PrintProduct;
  colorHex: string;
  picture: HTMLCanvasElement | null;
  turnRef: RefObject<TurnTarget>;
};

// The studio: soft daylight, a floor that takes shadows, and the chosen product on a turntable.
export function ProductScene({ product, colorHex, picture, turnRef }: ProductSceneProps) {
  const staging = PRODUCT_STAGING[product.id];
  return (
    <Canvas
      shadows="percentage"
      dpr={[1, 2]}
      camera={{ position: [0, 3.4, 15.5], fov: 23 }}
      gl={{ toneMapping: NeutralToneMapping, antialias: true }}
    >
      <StudioLighting />
      <Turntable key={product.id} turnRef={turnRef} restAngle={staging.restAngle}>
        {product.id === 'mug' && <MugModel picture={picture} accentHex={colorHex} />}
        {product.id === 'greeting-card' && <CardModel picture={picture} paperHex={colorHex} />}
        {product.id === 't-shirt' && <TeeModel picture={picture} clothHex={colorHex} />}
      </Turntable>
      <FloorShadow width={staging.shadowWidth} />
    </Canvas>
  );
}
