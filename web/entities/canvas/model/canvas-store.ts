import type {
  CanvasDesign,
  CanvasElement,
  ImageElement,
  ShapeElement,
  ShapeKind,
  TextElement,
} from '@bottega/server';
import { create } from 'zustand';

import {
  applyEdit,
  INITIAL_CANVAS_STATE,
  insertElement,
  stepThroughHistory,
  type CanvasState,
} from './canvas-store/canvas-state';
import {
  moveInStack,
  replaceElement,
  withoutElement,
  type StackMove,
} from './canvas-store/design-edits';
import {
  createElementCopy,
  createImageElement,
  createShapeElement,
  createTextElement,
  type PaperPoint,
  type PlaceablePhoto,
  type TextPresetName,
} from './canvas-store/element-factories';

export type ElementFrame = { x: number; y: number; width: number; height: number };
export type TextStyle = Pick<
  TextElement,
  'content' | 'fontFamily' | 'fontWeight' | 'fontSize' | 'align' | 'color'
>;
export type ImageStyle = Pick<ImageElement, 'filter' | 'crop'>;
export type ShapeStyle = Pick<ShapeElement, 'shape' | 'fill'>;
// Continuous edits (drags, slider sweeps, nudges) merge into one undo step; single ones never do.
export type EditPace = 'continuous' | 'single';

type CanvasActions = {
  loadDesign: (design: CanvasDesign) => void;
  replaceDesign: (design: CanvasDesign) => void;
  selectElement: (elementId: string | null) => void;
  addPhoto: (photo: PlaceablePhoto, center?: PaperPoint) => void;
  addText: (presetName: TextPresetName) => void;
  addShape: (shape: ShapeKind) => void;
  duplicateElement: (elementId: string) => void;
  removeElement: (elementId: string) => void;
  setElementFrame: (elementId: string, frame: Partial<ElementFrame>, pace?: EditPace) => void;
  setElementOpacity: (elementId: string, opacity: number, pace?: EditPace) => void;
  styleText: (elementId: string, style: Partial<TextStyle>, pace?: EditPace) => void;
  styleImage: (elementId: string, style: Partial<ImageStyle>) => void;
  styleShape: (elementId: string, style: Partial<ShapeStyle>, pace?: EditPace) => void;
  moveElementInStack: (elementId: string, move: StackMove) => void;
  resizePage: (width: number, height: number) => void;
  setPaperColor: (paperColor: string) => void;
  renameDesign: (name: string) => void;
  undo: () => void;
  redo: () => void;
};

// Spreads a style onto elements of one kind only, leaving any other kind untouched.
function restyle(kind: CanvasElement['kind'], style: object) {
  return (element: CanvasElement) => (element.kind === kind ? { ...element, ...style } : element);
}

function findCopyOf(design: CanvasDesign, elementId: string) {
  const original = design.elements.find(({ id }) => id === elementId);
  return original ? createElementCopy(original) : null;
}

export const useCanvasStore = create<CanvasState & CanvasActions>()((set) => {
  const edit = (editKey: string | null, editDesign: (design: CanvasDesign) => CanvasDesign) =>
    set((state) => applyEdit(state, editKey, editDesign));
  const editElement = (
    editKey: string,
    elementId: string,
    change: (element: CanvasElement) => CanvasElement,
    pace: EditPace = 'single',
  ) =>
    edit(pace === 'continuous' ? `${editKey}:${elementId}` : null, (design) =>
      replaceElement(design, elementId, change),
    );
  const insert = (createElement: (design: CanvasDesign) => CanvasElement | null) =>
    set((state) => insertElement(state, createElement));

  return {
    ...INITIAL_CANVAS_STATE,
    loadDesign: (design) => set({ ...INITIAL_CANVAS_STATE, design }),
    replaceDesign: (nextDesign) =>
      set((state) => ({
        ...applyEdit(state, null, (design) => ({ ...nextDesign, id: design.id })),
        selectedElementId: nextDesign.elements.some(({ id }) => id === state.selectedElementId)
          ? state.selectedElementId
          : null,
      })),
    selectElement: (selectedElementId) => set({ selectedElementId }),
    addPhoto: (photo, center) => insert((design) => createImageElement(photo, design, center)),
    addText: (presetName) => insert((design) => createTextElement(design, presetName)),
    addShape: (shape) => insert((design) => createShapeElement(design, shape)),
    duplicateElement: (elementId) => insert((design) => findCopyOf(design, elementId)),
    removeElement: (elementId) =>
      set((state) => ({
        ...applyEdit(state, null, (design) => withoutElement(design, elementId)),
        selectedElementId: state.selectedElementId === elementId ? null : state.selectedElementId,
      })),
    setElementFrame: (elementId, frame, pace) =>
      editElement('frame', elementId, (element) => ({ ...element, ...frame }), pace),
    setElementOpacity: (elementId, opacity, pace) =>
      editElement('opacity', elementId, (element) => ({ ...element, opacity }), pace),
    styleText: (elementId, style, pace) =>
      editElement(`text-${Object.keys(style).join()}`, elementId, restyle('text', style), pace),
    styleImage: (elementId, style) =>
      editElement(`image-${Object.keys(style).join()}`, elementId, restyle('image', style)),
    styleShape: (elementId, style, pace) =>
      editElement(`shape-${Object.keys(style).join()}`, elementId, restyle('shape', style), pace),
    moveElementInStack: (elementId, move) =>
      edit(null, (design) => moveInStack(design, elementId, move)),
    resizePage: (width, height) => edit(null, (design) => ({ ...design, width, height })),
    setPaperColor: (paperColor) => edit('paper-color', (design) => ({ ...design, paperColor })),
    renameDesign: (name) => edit('rename', (design) => ({ ...design, name })),
    undo: () => set((state) => stepThroughHistory(state, 'undo')),
    redo: () => set((state) => stepThroughHistory(state, 'redo')),
  };
});

export function useSelectedElement() {
  return useCanvasStore(
    (state) =>
      state.design?.elements.find((element) => element.id === state.selectedElementId) ?? null,
  );
}

// Reads the working copy on demand, without subscribing a component to every edit.
export function readCurrentDesign() {
  return useCanvasStore.getState().design;
}
