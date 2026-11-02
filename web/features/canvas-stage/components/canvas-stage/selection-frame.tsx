import type { CanvasElement } from '@/entities/canvas';

import { RESIZE_HANDLES } from '../../lib/resize-frame';
import { FrameHandle } from './selection-frame/frame-handle';
import { QuickActions } from './selection-frame/quick-actions';

type SelectionFrameProps = {
  element: CanvasElement;
  scale: number;
};

// Room above the frame for the quick actions; closer to the top than this, they sit below.
const QUICK_ACTIONS_CLEARANCE = 52;

// Drawn in screen pixels outside the paper's clip; a white hairline keeps it visible on clay.
export function SelectionFrame({ element, scale }: SelectionFrameProps) {
  const top = element.y * scale;
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: element.x * scale,
        top,
        width: element.width * scale,
        height: element.height * scale,
      }}
    >
      <div
        aria-hidden
        className="absolute -inset-px border-2 border-clay shadow-[0_0_0_1px_rgb(255_255_255/0.85),inset_0_0_0_1px_rgb(255_255_255/0.85)]"
      />
      {RESIZE_HANDLES.map((handle) => (
        <FrameHandle key={handle.name} element={element} handle={handle} scale={scale} />
      ))}
      <QuickActions
        elementId={element.id}
        placement={top < QUICK_ACTIONS_CLEARANCE ? 'below' : 'above'}
      />
    </div>
  );
}
