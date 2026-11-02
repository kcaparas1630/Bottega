import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';

// Where the viewer has turned the product, in radians from its resting angle; the scene eases towards it.
export type TurnTarget = { angle: number };

const RADIANS_PER_PIXEL = 0.011;
const KEY_STEP = Math.PI / 12;
const FULL_TURN = Math.PI * 2;

function toDegrees(angle: number) {
  return ((Math.round((angle * 180) / Math.PI) % 360) + 360) % 360;
}

// Drag sideways or use the arrow keys to turn the product; turns past the limit are held at it.
export function useTurntable(turnLimit: number) {
  const turnRef = useRef<TurnTarget>({ angle: 0 });
  const dragRef = useRef<{ startX: number; startAngle: number } | null>(null);
  const [degrees, setDegrees] = useState(0);
  const holdWithinLimit = useCallback(
    (angle: number) => Math.max(-turnLimit, Math.min(turnLimit, angle)),
    [turnLimit],
  );

  const turnTo = useCallback(
    (angle: number) => {
      turnRef.current.angle = holdWithinLimit(angle);
      setDegrees(toDegrees(turnRef.current.angle));
    },
    [holdWithinLimit],
  );
  const resetTurn = useCallback(() => turnTo(0), [turnTo]);
  const spinOnce = useCallback(() => {
    if (!Number.isFinite(turnLimit)) turnRef.current.angle += FULL_TURN;
  }, [turnLimit]);

  const stageHandlers = {
    onPointerDown(event: PointerEvent<HTMLElement>) {
      event.currentTarget.setPointerCapture(event.pointerId);
      dragRef.current = { startX: event.clientX, startAngle: turnRef.current.angle };
    },
    onPointerMove(event: PointerEvent<HTMLElement>) {
      if (!dragRef.current) return;
      const draggedAngle = (event.clientX - dragRef.current.startX) * RADIANS_PER_PIXEL;
      turnRef.current.angle = holdWithinLimit(dragRef.current.startAngle + draggedAngle);
    },
    onPointerUp() {
      dragRef.current = null;
      setDegrees(toDegrees(turnRef.current.angle));
    },
    onKeyDown(event: KeyboardEvent<HTMLElement>) {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      turnTo(turnRef.current.angle + (event.key === 'ArrowRight' ? KEY_STEP : -KEY_STEP));
    },
  };

  return { turnRef, degrees, resetTurn, spinOnce, stageHandlers };
}

export type Turntable = ReturnType<typeof useTurntable>;
