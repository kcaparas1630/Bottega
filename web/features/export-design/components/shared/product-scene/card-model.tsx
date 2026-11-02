import { useEffect, useMemo } from 'react';
import { BoxGeometry, MeshStandardMaterial, PlaneGeometry } from 'three';

import { useCanvasTexture } from '../../../hooks/use-canvas-texture';
import { useFadeIn } from '../../../hooks/use-fade-in';
import { cropToAspect } from '../../../lib/crop-to-aspect';
import { paintCardBack } from '../../../lib/paint-card-back';
import { FLOOR_Y } from '../../../lib/product-staging';

// A folded 5 × 7 in card in inches, standing on its edge with the cover swung open towards the viewer.
const CARD = { width: 5, height: 7, thickness: 0.03 };
const CARD_SCALE = 0.5;
const COVER_OPENING = -0.34;
const BACK_OPENING = 0.32;
const SPINE_X = -1.2;
const UNCOATED = { roughness: 0.9, envMapIntensity: 0.45 } as const;
// The cover print floats a hair off the paper so the two never flicker through each other.
const PRINT_LIFT = 0.004;

type CardModelProps = {
  picture: HTMLCanvasElement | null;
  paperHex: string;
};

// A greeting card standing open: the design fades onto the cover, the shop's mark is on the back.
export function CardModel({ picture, paperHex }: CardModelProps) {
  const shapes = useMemo(
    () => ({
      panel: new BoxGeometry(CARD.width, CARD.height, CARD.thickness),
      cover: new PlaneGeometry(CARD.width, CARD.height),
    }),
    [],
  );
  useEffect(() => () => Object.values(shapes).forEach((shape) => shape.dispose()), [shapes]);
  const coverCanvas = useMemo(
    () => picture && cropToAspect(picture, CARD.width / CARD.height),
    [picture],
  );
  const backCanvas = useMemo(() => paintCardBack(paperHex), [paperHex]);
  const coverTexture = useCanvasTexture(coverCanvas);
  const backTexture = useCanvasTexture(backCanvas);
  const coverMaterialRef = useFadeIn<MeshStandardMaterial>();
  // Box faces in three's order: right, left, top, bottom, front, back; only the back of the card is signed.
  const materials = useMemo(() => {
    const paper = new MeshStandardMaterial({ color: paperHex, ...UNCOATED });
    const signedBack = new MeshStandardMaterial({ map: backTexture, ...UNCOATED });
    return { paper, back: [paper, paper, paper, paper, paper, signedBack] };
  }, [paperHex, backTexture]);
  useEffect(() => () => materials.back.forEach((material) => material.dispose()), [materials]);

  const panelCenter = [CARD.width / 2, CARD.height / 2] as const;
  return (
    <group position={[SPINE_X, FLOOR_Y, 0]} scale={CARD_SCALE}>
      <group rotation-y={COVER_OPENING}>
        <mesh
          geometry={shapes.panel}
          material={materials.paper}
          position={[...panelCenter, CARD.thickness / 2]}
          castShadow
          receiveShadow
        />
        {coverTexture && (
          <mesh geometry={shapes.cover} position={[...panelCenter, CARD.thickness + PRINT_LIFT]}>
            <meshStandardMaterial
              ref={coverMaterialRef}
              map={coverTexture}
              transparent
              opacity={0}
              {...UNCOATED}
            />
          </mesh>
        )}
      </group>
      <group rotation-y={BACK_OPENING}>
        <mesh
          geometry={shapes.panel}
          material={materials.back}
          position={[...panelCenter, -CARD.thickness / 2]}
          castShadow
          receiveShadow
        />
      </group>
    </group>
  );
}
