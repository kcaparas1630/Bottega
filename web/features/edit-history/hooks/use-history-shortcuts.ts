import { useEffect } from 'react';

import { useCanvasStore } from '@/entities/canvas';

// Fields keep their own undo; dialogs are not the canvas.
function belongsToField(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const isField = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
  return isField || target.isContentEditable || target.closest('[role="dialog"]') !== null;
}

function handleHistoryKey(event: KeyboardEvent) {
  if (!(event.ctrlKey || event.metaKey) || belongsToField(event.target)) return;
  const key = event.key.toLowerCase();
  const isRedo = (key === 'z' && event.shiftKey) || key === 'y';
  if (key !== 'z' && !isRedo) return;
  event.preventDefault();
  const { undo, redo } = useCanvasStore.getState();
  if (isRedo) redo();
  else undo();
}

// Ctrl/⌘+Z undoes; Ctrl/⌘+Shift+Z or Ctrl+Y redoes.
export function useHistoryShortcuts() {
  useEffect(() => {
    window.addEventListener('keydown', handleHistoryKey);
    return () => window.removeEventListener('keydown', handleHistoryKey);
  }, []);
}
