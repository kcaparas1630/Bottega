import { SHAPE_BORDER_RADIUS, type ShapeElement } from '@/entities/canvas';

export function ShapeElementView({ element }: { element: ShapeElement }) {
  return (
    <div
      className="size-full"
      style={{
        backgroundColor: element.fill,
        borderRadius: SHAPE_BORDER_RADIUS[element.shape],
      }}
    />
  );
}
