import { useEffect, useMemo } from 'react';
import { CanvasTexture, SRGBColorSpace } from 'three';

// Wraps a painted canvas as a colour-correct texture, and frees the GPU copy when the canvas changes.
export function useCanvasTexture(paintedCanvas: HTMLCanvasElement | null) {
  const texture = useMemo(() => {
    if (!paintedCanvas) return null;
    const created = new CanvasTexture(paintedCanvas);
    created.colorSpace = SRGBColorSpace;
    created.anisotropy = 8;
    return created;
  }, [paintedCanvas]);
  useEffect(() => () => texture?.dispose(), [texture]);
  return texture;
}
