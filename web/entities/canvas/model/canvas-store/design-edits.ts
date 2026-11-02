import type { CanvasDesign, CanvasElement } from '@bottega/server';

export type StackMove = 'front' | 'forward' | 'backward' | 'back';

export function replaceElement(
  design: CanvasDesign,
  elementId: string,
  transformElement: (element: CanvasElement) => CanvasElement,
): CanvasDesign {
  return {
    ...design,
    elements: design.elements.map((element) =>
      element.id === elementId ? transformElement(element) : element,
    ),
  };
}

export function withoutElement(design: CanvasDesign, elementId: string): CanvasDesign {
  return { ...design, elements: design.elements.filter((element) => element.id !== elementId) };
}

// Reorders one element; later elements paint above earlier ones. Returns the same design on a no-op.
export function moveInStack(design: CanvasDesign, elementId: string, move: StackMove) {
  const currentIndex = design.elements.findIndex((element) => element.id === elementId);
  const movingElement = design.elements[currentIndex];
  if (!movingElement) return design;
  const lastIndex = design.elements.length - 1;
  const targetIndex = {
    front: lastIndex,
    forward: Math.min(currentIndex + 1, lastIndex),
    backward: Math.max(currentIndex - 1, 0),
    back: 0,
  }[move];
  if (targetIndex === currentIndex) return design;
  const elements = design.elements.filter((element) => element.id !== elementId);
  elements.splice(targetIndex, 0, movingElement);
  return { ...design, elements };
}
