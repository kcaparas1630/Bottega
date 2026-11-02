import type { CanvasDesign } from '@bottega/server';

const MAX_UNDO_STEPS = 100;
const MERGE_WINDOW_MS = 1000;

export type EditHistory = {
  past: CanvasDesign[];
  future: CanvasDesign[];
  lastEditKey: string | null;
  lastEditAt: number;
};

export const EMPTY_HISTORY: EditHistory = {
  past: [],
  future: [],
  lastEditKey: null,
  lastEditAt: 0,
};

// Same-key edits less than a second apart (a drag, a slider sweep) fold into one undo step.
export function recordEdit(
  history: EditHistory,
  previousDesign: CanvasDesign,
  editKey: string | null,
  now: number,
): EditHistory {
  const isContinuation =
    editKey !== null &&
    editKey === history.lastEditKey &&
    now - history.lastEditAt < MERGE_WINDOW_MS &&
    history.past.length > 0;
  return {
    past: isContinuation ? history.past : [...history.past, previousDesign].slice(-MAX_UNDO_STEPS),
    future: [],
    lastEditKey: editKey,
    lastEditAt: now,
  };
}

type HistoryStep = { history: EditHistory; design: CanvasDesign };

// Hands back the design before the last edit, or null when there is nothing to undo.
export function undoEdit(history: EditHistory, currentDesign: CanvasDesign): HistoryStep | null {
  const design = history.past.at(-1);
  if (!design) return null;
  const past = history.past.slice(0, -1);
  return {
    design,
    history: { ...EMPTY_HISTORY, past, future: [...history.future, currentDesign] },
  };
}

// Hands back the design the last undo stepped away from, or null when there is nothing to redo.
export function redoEdit(history: EditHistory, currentDesign: CanvasDesign): HistoryStep | null {
  const design = history.future.at(-1);
  if (!design) return null;
  const future = history.future.slice(0, -1);
  return { design, history: { ...EMPTY_HISTORY, past: [...history.past, currentDesign], future } };
}
