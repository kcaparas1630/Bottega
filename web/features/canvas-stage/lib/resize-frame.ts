import type { CanvasElement, ElementFrame } from '@/entities/canvas';

import type { DragDelta } from '../hooks/use-pointer-drag';

const MIN_ELEMENT_SIZE = 24;

// Which edges a handle moves: -1 the left/top edge, 1 the right/bottom edge, 0 neither.
export type ResizeHandle = {
  name: string;
  horizontal: -1 | 0 | 1;
  vertical: -1 | 0 | 1;
  cursor: string;
};

export const RESIZE_HANDLES: readonly ResizeHandle[] = [
  { name: 'top left', horizontal: -1, vertical: -1, cursor: 'nwse-resize' },
  { name: 'top', horizontal: 0, vertical: -1, cursor: 'ns-resize' },
  { name: 'top right', horizontal: 1, vertical: -1, cursor: 'nesw-resize' },
  { name: 'right', horizontal: 1, vertical: 0, cursor: 'ew-resize' },
  { name: 'bottom right', horizontal: 1, vertical: 1, cursor: 'nwse-resize' },
  { name: 'bottom', horizontal: 0, vertical: 1, cursor: 'ns-resize' },
  { name: 'bottom left', horizontal: -1, vertical: 1, cursor: 'nesw-resize' },
  { name: 'left', horizontal: -1, vertical: 0, cursor: 'ew-resize' },
];

export function readFrame(element: CanvasElement): ElementFrame {
  return { x: element.x, y: element.y, width: element.width, height: element.height };
}

export function isCornerHandle(handle: ResizeHandle) {
  return handle.horizontal !== 0 && handle.vertical !== 0;
}

// Resizes from one handle while the opposite edge stays put; corners can keep the proportions.
export function resizeFrame(
  startFrame: ElementFrame,
  handle: ResizeHandle,
  delta: DragDelta,
  keepAspectRatio: boolean,
): ElementFrame {
  let width = Math.max(MIN_ELEMENT_SIZE, startFrame.width + handle.horizontal * delta.deltaX);
  let height = Math.max(MIN_ELEMENT_SIZE, startFrame.height + handle.vertical * delta.deltaY);
  if (keepAspectRatio && isCornerHandle(handle)) {
    const growth = Math.max(width / startFrame.width, height / startFrame.height);
    width = startFrame.width * growth;
    height = startFrame.height * growth;
  }
  return {
    x: Math.round(
      handle.horizontal === -1 ? startFrame.x + startFrame.width - width : startFrame.x,
    ),
    y: Math.round(
      handle.vertical === -1 ? startFrame.y + startFrame.height - height : startFrame.y,
    ),
    width: Math.round(width),
    height: Math.round(height),
  };
}
