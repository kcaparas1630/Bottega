import { useCallback, useEffect, useState } from 'react';

import type { CanvasDesign } from '@/entities/canvas';
import { useElementSize } from '@/shared/hooks/use-element-size';

// Space kept around the fitted paper; the bottom leaves room for the floating add dock.
export const STAGE_PADDING = { top: 40, side: 48, bottom: 112 };

const ZOOM_STEPS = [0.1, 0.25, 0.33, 0.5, 0.67, 0.75, 1, 1.25, 1.5, 2, 3];
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 3;
const WHEEL_ZOOM_SPEED = 0.002;

export type StageZoom = {
  scale: number;
  isFitted: boolean;
  // Callback ref for the scrolling viewport the paper is fitted into.
  attachViewport: (node: HTMLElement | null) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  fitToScreen: () => void;
  showActualSize: () => void;
};

function clampZoom(zoom: number) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom));
}

function fitScaleFor(design: CanvasDesign | null, viewportWidth: number, viewportHeight: number) {
  if (!design) return 0;
  const availableWidth = viewportWidth - STAGE_PADDING.side * 2;
  const availableHeight = viewportHeight - STAGE_PADDING.top - STAGE_PADDING.bottom;
  return Math.max(0, Math.min(availableWidth / design.width, availableHeight / design.height));
}

// Fits the paper to the viewport until the person zooms; Ctrl/⌘ + wheel zooms smoothly.
export function useStageZoom(design: CanvasDesign | null): StageZoom {
  const { measureRef, size } = useElementSize();
  const [viewport, setViewport] = useState<HTMLElement | null>(null);
  const [chosenZoom, setChosenZoom] = useState<number | null>(null);
  const fitScale = fitScaleFor(design, size.width, size.height);
  const scale = chosenZoom ?? fitScale;

  const attachViewport = useCallback(
    (node: HTMLElement | null) => {
      measureRef(node);
      setViewport(node);
    },
    [measureRef],
  );

  useEffect(() => {
    if (!viewport) return;
    function handleWheel(event: WheelEvent) {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      const zoomFactor = Math.exp(-event.deltaY * WHEEL_ZOOM_SPEED);
      setChosenZoom((currentZoom) => clampZoom((currentZoom ?? fitScale) * zoomFactor));
    }
    viewport.addEventListener('wheel', handleWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', handleWheel);
  }, [viewport, fitScale]);

  return {
    scale,
    isFitted: chosenZoom === null,
    attachViewport,
    zoomIn: () => setChosenZoom(ZOOM_STEPS.find((step) => step > scale * 1.01) ?? MAX_ZOOM),
    zoomOut: () =>
      setChosenZoom([...ZOOM_STEPS].reverse().find((step) => step < scale * 0.99) ?? MIN_ZOOM),
    fitToScreen: () => setChosenZoom(null),
    showActualSize: () => setChosenZoom(1),
  };
}
