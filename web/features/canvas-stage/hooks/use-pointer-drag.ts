import { useRef, type PointerEvent } from 'react';

export type DragDelta = { deltaX: number; deltaY: number };

type PointerDragOptions<DragStart> = {
  scale: number;
  // Runs on pointer down; its return value is handed back on every move.
  onDragStart: () => DragStart;
  onDrag: (dragStart: DragStart, delta: DragDelta) => void;
};

type ActiveDrag<DragStart> = { clientX: number; clientY: number; dragStart: DragStart };

// Pointer-captured dragging that reports movement in design units, not screen pixels.
export function usePointerDrag<DragStart>({
  scale,
  onDragStart,
  onDrag,
}: PointerDragOptions<DragStart>) {
  const activeDragRef = useRef<ActiveDrag<DragStart> | null>(null);

  function handlePointerDown(event: PointerEvent<HTMLElement>) {
    if (event.button !== 0) return;
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    activeDragRef.current = {
      clientX: event.clientX,
      clientY: event.clientY,
      dragStart: onDragStart(),
    };
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const activeDrag = activeDragRef.current;
    if (!activeDrag) return;
    onDrag(activeDrag.dragStart, {
      deltaX: (event.clientX - activeDrag.clientX) / scale,
      deltaY: (event.clientY - activeDrag.clientY) / scale,
    });
  }

  function handlePointerEnd(event: PointerEvent<HTMLElement>) {
    activeDragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerEnd,
    onPointerCancel: handlePointerEnd,
  };
}
