import type { CanvasElement } from '@/entities/canvas';

import { ElementHeader } from './element-properties/element-header';
import { ImageStyleSection } from './element-properties/image-style-section';
import { LayerSection } from './element-properties/layer-section';
import { PositionSection } from './element-properties/position-section';
import { ShapeStyleSection } from './element-properties/shape-style-section';
import { SizeSection } from './element-properties/size-section';
import { TextStyleSection } from './element-properties/text-style-section';

// What it looks like first, then how big, where, and how it stacks.
export function ElementProperties({ element }: { element: CanvasElement }) {
  return (
    <div className="flex animate-paper-settle flex-col">
      <ElementHeader element={element} />
      {element.kind === 'image' && <ImageStyleSection element={element} />}
      {element.kind === 'text' && <TextStyleSection element={element} />}
      {element.kind === 'shape' && <ShapeStyleSection element={element} />}
      <SizeSection element={element} />
      <PositionSection element={element} />
      <LayerSection element={element} />
    </div>
  );
}
