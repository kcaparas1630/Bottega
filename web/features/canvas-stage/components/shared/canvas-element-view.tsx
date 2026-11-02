import type { CanvasElement } from '@/entities/canvas';

import { ImageElementView } from './canvas-element-view/image-element-view';
import { ShapeElementView } from './canvas-element-view/shape-element-view';
import { TextElementView } from './canvas-element-view/text-element-view';

export function CanvasElementView({ element }: { element: CanvasElement }) {
  return (
    <div className="size-full" style={{ opacity: element.opacity }}>
      {element.kind === 'image' && <ImageElementView element={element} />}
      {element.kind === 'text' && <TextElementView element={element} />}
      {element.kind === 'shape' && <ShapeElementView element={element} />}
    </div>
  );
}
