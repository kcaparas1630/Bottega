import type { ElementFrame } from '@/entities/canvas';

export type PageAlignment = 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom';
type PageSize = { width: number; height: number };

const ALIGNED_POSITIONS: Record<
  PageAlignment,
  (frame: ElementFrame, page: PageSize) => Partial<ElementFrame>
> = {
  left: () => ({ x: 0 }),
  center: (frame, page) => ({ x: Math.round((page.width - frame.width) / 2) }),
  right: (frame, page) => ({ x: page.width - frame.width }),
  top: () => ({ y: 0 }),
  middle: (frame, page) => ({ y: Math.round((page.height - frame.height) / 2) }),
  bottom: (frame, page) => ({ y: page.height - frame.height }),
};

// Moves a frame flush with one page edge, or centres it on one axis.
export function alignToPage(frame: ElementFrame, page: PageSize, alignment: PageAlignment) {
  return ALIGNED_POSITIONS[alignment](frame, page);
}
