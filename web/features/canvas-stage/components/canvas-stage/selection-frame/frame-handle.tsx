import { useCanvasStore, type CanvasElement } from '@/entities/canvas';
import { cn } from '@/shared/lib/cn';

import {
  isCornerHandle,
  readFrame,
  resizeFrame,
  type ResizeHandle,
} from '../../../lib/resize-frame';
import { usePointerDrag } from '../../../hooks/use-pointer-drag';

type FrameHandleProps = {
  element: CanvasElement;
  handle: ResizeHandle;
  scale: number;
};

// Corner dots resize (photos keep their proportions); edge bars stretch one side.
export function FrameHandle({ element, handle, scale }: FrameHandleProps) {
  const setElementFrame = useCanvasStore((state) => state.setElementFrame);
  const dragHandlers = usePointerDrag({
    scale,
    onDragStart: () => readFrame(element),
    onDrag: (startFrame, delta) =>
      setElementFrame(
        element.id,
        resizeFrame(startFrame, handle, delta, element.kind === 'image'),
        'continuous',
      ),
  });
  const isCorner = isCornerHandle(handle);
  return (
    <span
      aria-hidden
      className={cn(
        'pointer-events-auto absolute -translate-1/2 touch-none border border-clay bg-white shadow-[0_1px_3px_rgb(42_35_32/0.3)]',
        isCorner && 'size-3 rounded-full',
        !isCorner && handle.horizontal === 0 && 'h-1.5 w-5 rounded-full',
        !isCorner && handle.vertical === 0 && 'h-5 w-1.5 rounded-full',
      )}
      style={{
        left: `${(handle.horizontal + 1) * 50}%`,
        top: `${(handle.vertical + 1) * 50}%`,
        cursor: handle.cursor,
      }}
      {...dragHandlers}
    />
  );
}
