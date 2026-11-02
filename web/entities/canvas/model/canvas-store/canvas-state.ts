import type { CanvasDesign, CanvasElement } from '@bottega/server';

import {
  EMPTY_HISTORY,
  recordEdit,
  redoEdit,
  undoEdit,
  type EditHistory,
} from './canvas-state/edit-history';

export type CanvasState = {
  design: CanvasDesign | null;
  selectedElementId: string | null;
  // Counts local edits so autosave knows when the design changed.
  editRevision: number;
  history: EditHistory;
};

export const INITIAL_CANVAS_STATE: CanvasState = {
  design: null,
  selectedElementId: null,
  editRevision: 0,
  history: EMPTY_HISTORY,
};

// Applies one edit and records it for undo; a null key never merges with the previous step.
export function applyEdit(
  state: CanvasState,
  editKey: string | null,
  editDesign: (design: CanvasDesign) => CanvasDesign,
): Partial<CanvasState> {
  if (!state.design) return {};
  const nextDesign = editDesign(state.design);
  if (nextDesign === state.design) return {};
  return {
    design: nextDesign,
    editRevision: state.editRevision + 1,
    history: recordEdit(state.history, state.design, editKey, Date.now()),
  };
}

// Puts a new element on top of the stack and selects it.
export function insertElement(
  state: CanvasState,
  createElement: (design: CanvasDesign) => CanvasElement | null,
): Partial<CanvasState> {
  const element = state.design ? createElement(state.design) : null;
  if (!element) return {};
  const edit = applyEdit(state, null, (design) => ({
    ...design,
    elements: [...design.elements, element],
  }));
  return { ...edit, selectedElementId: element.id };
}

export function stepThroughHistory(
  state: CanvasState,
  direction: 'undo' | 'redo',
): Partial<CanvasState> {
  if (!state.design) return {};
  const restored = (direction === 'undo' ? undoEdit : redoEdit)(state.history, state.design);
  if (!restored) return {};
  const isSelectionKept = restored.design.elements.some(({ id }) => id === state.selectedElementId);
  return {
    ...restored,
    editRevision: state.editRevision + 1,
    selectedElementId: isSelectionKept ? state.selectedElementId : null,
  };
}
