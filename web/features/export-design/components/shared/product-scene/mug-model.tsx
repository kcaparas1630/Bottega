import { useEffect, useMemo } from 'react';
import {
  CylinderGeometry,
  DoubleSide,
  LatheGeometry,
  TubeGeometry,
  type MeshPhysicalMaterial,
} from 'three';

import { useCanvasTexture } from '../../../hooks/use-canvas-texture';
import { useFadeIn } from '../../../hooks/use-fade-in';
import { cropToAspect } from '../../../lib/crop-to-aspect';
import {
  MUG_HANDLE_CURVE,
  MUG_HANDLE_THICKNESS,
  MUG_INNER_PROFILE,
  MUG_OUTER_PROFILE,
  MUG_PRINT_BAND,
  MUG_RADIUS,
} from '../../../lib/mug-shape';
import { FLOOR_Y } from '../../../lib/product-staging';

const MUG_SCALE = 0.92;
const ROUND_SEGMENTS = 144;
const CERAMIC_WHITE = '#f6f3ed';
const GLAZE = {
  roughness: 0.22,
  clearcoat: 1,
  clearcoatRoughness: 0.05,
  envMapIntensity: 0.75,
} as const;
// The print sits a hair proud of the glaze so the two surfaces never flicker through each other.
const PRINT_RADIUS = MUG_RADIUS + 0.004;

function createMugGeometries() {
  return {
    outside: new LatheGeometry(MUG_OUTER_PROFILE, ROUND_SEGMENTS),
    inside: new LatheGeometry(MUG_INNER_PROFILE, ROUND_SEGMENTS),
    printBand: new CylinderGeometry(
      PRINT_RADIUS,
      PRINT_RADIUS,
      MUG_PRINT_BAND.height,
      ROUND_SEGMENTS,
      1,
      true,
      -MUG_PRINT_BAND.arc / 2,
      MUG_PRINT_BAND.arc,
    ),
    handle: new TubeGeometry(MUG_HANDLE_CURVE, 120, MUG_HANDLE_THICKNESS, 28, false),
  };
}

type MugModelProps = {
  picture: HTMLCanvasElement | null;
  accentHex: string;
};

// A glazed mug: white outside, the accent colour inside and on the handle; the design fades onto the front.
export function MugModel({ picture, accentHex }: MugModelProps) {
  const geometries = useMemo(() => createMugGeometries(), []);
  useEffect(
    () => () => Object.values(geometries).forEach((geometry) => geometry.dispose()),
    [geometries],
  );
  const printCanvas = useMemo(
    () =>
      picture && cropToAspect(picture, (MUG_PRINT_BAND.arc * MUG_RADIUS) / MUG_PRINT_BAND.height),
    [picture],
  );
  const printTexture = useCanvasTexture(printCanvas);
  const printMaterialRef = useFadeIn<MeshPhysicalMaterial>();

  return (
    <group position-y={FLOOR_Y} scale={MUG_SCALE}>
      <mesh geometry={geometries.outside} castShadow receiveShadow>
        <meshPhysicalMaterial color={CERAMIC_WHITE} side={DoubleSide} {...GLAZE} />
      </mesh>
      <mesh geometry={geometries.inside} receiveShadow>
        <meshPhysicalMaterial color={accentHex} side={DoubleSide} {...GLAZE} />
      </mesh>
      {printTexture && (
        <mesh geometry={geometries.printBand} position-y={MUG_PRINT_BAND.centerY}>
          <meshPhysicalMaterial
            ref={printMaterialRef}
            map={printTexture}
            transparent
            opacity={0}
            {...GLAZE}
          />
        </mesh>
      )}
      <mesh geometry={geometries.handle} castShadow receiveShadow>
        <meshPhysicalMaterial color={accentHex} {...GLAZE} />
      </mesh>
    </group>
  );
}
