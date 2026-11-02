import type { ElementFrame } from '@/entities/canvas';

export const ASPECT_RATIO_PRESETS = [
  { label: '1:1', ratio: 1 },
  { label: '4:5', ratio: 4 / 5 },
  { label: '3:2', ratio: 3 / 2 },
  { label: '16:9', ratio: 16 / 9 },
] as const;

const RATIO_TOLERANCE = 0.01;

export function hasAspectRatio(frame: ElementFrame, ratio: number) {
  return Math.abs(frame.width / frame.height - ratio) < RATIO_TOLERANCE;
}

// Reshapes a frame to width ÷ height = ratio, keeping its area and its centre.
export function reshapeToAspectRatio(frame: ElementFrame, ratio: number): ElementFrame {
  const width = Math.sqrt(frame.width * frame.height * ratio);
  const height = width / ratio;
  return {
    x: Math.round(frame.x + (frame.width - width) / 2),
    y: Math.round(frame.y + (frame.height - height) / 2),
    width: Math.round(width),
    height: Math.round(height),
  };
}

// Sets one side; with the ratio locked the other side follows.
export function resizeSide(
  frame: ElementFrame,
  side: 'width' | 'height',
  length: number,
  isRatioLocked: boolean,
): Partial<ElementFrame> {
  if (!isRatioLocked) return { [side]: length };
  return side === 'width'
    ? { width: length, height: Math.round((length * frame.height) / frame.width) }
    : { height: length, width: Math.round((length * frame.width) / frame.height) };
}
