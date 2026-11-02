import type { ReactNode } from 'react';

import { useCanvasStore } from '@/entities/canvas';

import { useDesignPicture } from '../../../hooks/use-design-picture';
import type { DesignPicture } from '../../../lib/design-picture';

// Wider pages are scaled down to this, which is still sharp on a mug or a card at stage size.
const MAX_PICTURE_WIDTH = 1600;

type DesignPictureSourceProps = {
  renderDesign: (widthPx: number) => ReactNode;
  onPicture: (picture: DesignPicture) => void;
};

// Lays the design out once, unseen and full size, so it can become the picture the 3D products wear.
export function DesignPictureSource({ renderDesign, onPicture }: DesignPictureSourceProps) {
  const designWidth = useCanvasStore((state) => state.design?.width ?? 0);
  const captureRef = useDesignPicture(onPicture);
  if (!designWidth) return null;
  return (
    <div aria-hidden inert className="pointer-events-none fixed top-0 left-0 -z-10 opacity-0">
      <div ref={captureRef} className="w-fit">
        {renderDesign(Math.min(designWidth, MAX_PICTURE_WIDTH))}
      </div>
    </div>
  );
}
