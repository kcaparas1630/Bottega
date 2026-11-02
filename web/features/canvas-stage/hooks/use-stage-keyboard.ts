import { useEffect } from 'react';

import { useCanvasStore } from '@/entities/canvas';

const NUDGE_DIRECTIONS: Partial<Record<string, { x: number; y: number }>> = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};
const SMALL_NUDGE = 1;
const LARGE_NUDGE = 10;

// Keys typed into a field or a dialog belong to that field, not to the canvas.
function isTypingOrInDialog(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const isField = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
  return isField || target.isContentEditable || target.closest('[role="dialog"]') !== null;
}

function handleStageKey(event: KeyboardEvent) {
  if (isTypingOrInDialog(event.target)) return;
  const {
    design,
    selectedElementId,
    removeElement,
    selectElement,
    setElementFrame,
    duplicateElement,
  } = useCanvasStore.getState();
  const selectedElement = design?.elements.find((element) => element.id === selectedElementId);
  if (!selectedElement) return;
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'd') {
    event.preventDefault();
    duplicateElement(selectedElement.id);
    return;
  }
  if (event.key === 'Delete' || event.key === 'Backspace') {
    event.preventDefault();
    removeElement(selectedElement.id);
    return;
  }
  if (event.key === 'Escape') {
    selectElement(null);
    return;
  }
  const direction = NUDGE_DIRECTIONS[event.key];
  if (!direction) return;
  event.preventDefault();
  const step = event.shiftKey ? LARGE_NUDGE : SMALL_NUDGE;
  setElementFrame(
    selectedElement.id,
    {
      x: selectedElement.x + direction.x * step,
      y: selectedElement.y + direction.y * step,
    },
    'continuous',
  );
}

// Ctrl/⌘+D duplicates, Delete removes, Escape deselects, arrows nudge (Shift for bigger steps).
export function useStageKeyboard() {
  useEffect(() => {
    window.addEventListener('keydown', handleStageKey);
    return () => window.removeEventListener('keydown', handleStageKey);
  }, []);
}
