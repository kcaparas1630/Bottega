import { canvasDesignSchema, type CanvasDesign } from './canvas-design-schema';

type DesignRegistry = typeof globalThis & { bottegaDesignsById?: Map<string, CanvasDesign> };

// Kept in memory on globalThis so dev hot reloads keep designs, until a database lands.
const designsById = ((globalThis as DesignRegistry).bottegaDesignsById ??= new Map<
  string,
  CanvasDesign
>());

// The saved design, or null; one stored under an older schema (kept by hot reloads) counts as unsaved.
export function findDesign(designId: string) {
  const savedDesign = canvasDesignSchema.safeParse(designsById.get(designId));
  if (savedDesign.success) return savedDesign.data;
  designsById.delete(designId);
  return null;
}

export function saveDesign(design: CanvasDesign) {
  designsById.set(design.id, design);
  return design;
}
