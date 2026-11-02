import {
  SHAPE_BORDER_RADIUS,
  useCanvasStore,
  type ShapeElement,
  type ShapeKind,
} from '@/entities/canvas';
import { SegmentedControl } from '@/shared/ui/segmented-control';

import { ColorField } from '../../shared/color-field';
import { PropertySection } from '../../shared/property-section';

const SHAPE_LABELS: Record<ShapeKind, string> = {
  rectangle: 'Rectangle',
  rounded: 'Rounded rectangle',
  ellipse: 'Circle',
  arch: 'Arch',
};

const SHAPE_OPTIONS = (Object.keys(SHAPE_LABELS) as ShapeKind[]).map((shape) => ({
  value: shape,
  ariaLabel: SHAPE_LABELS[shape],
  label: (
    <span
      aria-hidden
      className="block size-3.5 border border-current"
      style={{ borderRadius: shape === 'rounded' ? '4px' : SHAPE_BORDER_RADIUS[shape] }}
    />
  ),
}));

// The shape's outline and its fill colour.
export function ShapeStyleSection({ element }: { element: ShapeElement }) {
  const styleShape = useCanvasStore((state) => state.styleShape);
  return (
    <PropertySection title="Shape">
      <SegmentedControl
        ariaLabel="Shape"
        value={element.shape}
        options={SHAPE_OPTIONS}
        onChange={(shape) => styleShape(element.id, { shape })}
      />
      <ColorField
        label="Fill colour"
        value={element.fill}
        onChange={(fill, pace) => styleShape(element.id, { fill }, pace)}
      />
    </PropertySection>
  );
}
