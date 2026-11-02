import { useEffect, useMemo } from 'react';
import { DoubleSide, PlaneGeometry, type MeshStandardMaterial } from 'three';

import { useCanvasTexture } from '../../../hooks/use-canvas-texture';
import { useFadeIn } from '../../../hooks/use-fade-in';
import { cropToAspect } from '../../../lib/crop-to-aspect';
import { paintTee, paintTeePrint } from '../../../lib/paint-tee';
import { FLOOR_Y } from '../../../lib/product-staging';
import { measureTeeDrape, TEE_PRINT_AREA, TEE_SIZE } from '../../../lib/tee-shape';

const TEE_SCALE = 0.118;
// The shirt hangs a little above the floor, the way a product shot floats it.
const HANG_HEIGHT = 0.3;
const COTTON = { side: DoubleSide, roughness: 1, envMapIntensity: 0.3 } as const;

function createDrapedCloth() {
  const cloth = new PlaneGeometry(TEE_SIZE.width, TEE_SIZE.height, 170, 150);
  const positions = cloth.attributes.position;
  if (!positions) return cloth;
  for (let index = 0; index < positions.count; index += 1) {
    positions.setZ(index, measureTeeDrape(positions.getX(index), positions.getY(index)));
  }
  cloth.computeVertexNormals();
  return cloth;
}

type TeeModelProps = {
  picture: HTMLCanvasElement | null;
  clothHex: string;
};

// A cotton tee hung for a product shot: soft folds across the chest, and the print fades in following them.
export function TeeModel({ picture, clothHex }: TeeModelProps) {
  const cloth = useMemo(() => createDrapedCloth(), []);
  useEffect(() => () => cloth.dispose(), [cloth]);
  const clothCanvas = useMemo(() => paintTee(clothHex), [clothHex]);
  const printCanvas = useMemo(
    () =>
      picture && paintTeePrint(cropToAspect(picture, TEE_PRINT_AREA.width / TEE_PRINT_AREA.height)),
    [picture],
  );
  const clothTexture = useCanvasTexture(clothCanvas);
  const printTexture = useCanvasTexture(printCanvas);
  const printMaterialRef = useFadeIn<MeshStandardMaterial>();

  return (
    <group position-y={FLOOR_Y + HANG_HEIGHT + (TEE_SIZE.height * TEE_SCALE) / 2} scale={TEE_SCALE}>
      <mesh geometry={cloth} receiveShadow>
        <meshStandardMaterial map={clothTexture} alphaTest={0.5} {...COTTON} />
      </mesh>
      {printTexture && (
        <mesh geometry={cloth}>
          <meshStandardMaterial
            ref={printMaterialRef}
            map={printTexture}
            transparent
            opacity={0}
            depthWrite={false}
            polygonOffset
            polygonOffsetFactor={-2}
            {...COTTON}
          />
        </mesh>
      )}
    </group>
  );
}
