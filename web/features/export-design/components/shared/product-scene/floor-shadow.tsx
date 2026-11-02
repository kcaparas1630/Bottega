import { useMemo } from 'react';

import { useCanvasTexture } from '../../../hooks/use-canvas-texture';
import { FLOOR_Y } from '../../../lib/product-staging';

function paintContactShadow() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  if (!context) return canvas;
  const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, 'rgb(30 20 14 / 0.5)');
  gradient.addColorStop(0.45, 'rgb(30 20 14 / 0.24)');
  gradient.addColorStop(1, 'rgb(30 20 14 / 0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 256);
  return canvas;
}

// An invisible floor that only shows the key light's shadow, plus a soft contact shadow under the product.
export function FloorShadow({ width }: { width: number }) {
  const contactCanvas = useMemo(() => paintContactShadow(), []);
  const contactTexture = useCanvasTexture(contactCanvas);
  return (
    <group position-y={FLOOR_Y}>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <shadowMaterial opacity={0.14} />
      </mesh>
      {width > 0 && (
        <mesh rotation-x={-Math.PI / 2} position-y={0.003}>
          <planeGeometry args={[width, width * 0.62]} />
          <meshBasicMaterial
            map={contactTexture}
            transparent
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      )}
    </group>
  );
}
