import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MathUtils, type Material } from 'three';

const FADE_RATE = 4.5;

// Fades a material in from clear once it mounts, so the print settles onto the product instead of popping on.
export function useFadeIn<FadingMaterial extends Material>() {
  const materialRef = useRef<FadingMaterial>(null);
  useFrame((_, delta) => {
    const material = materialRef.current;
    if (!material || material.opacity >= 0.999) return;
    material.opacity = MathUtils.damp(material.opacity, 1, FADE_RATE, delta);
  });
  return materialRef;
}
