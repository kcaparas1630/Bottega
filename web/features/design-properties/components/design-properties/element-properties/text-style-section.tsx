import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react';
import type { ReactNode } from 'react';

import { Slider } from '@/components/ui/slider';
import { useCanvasStore, type TextAlign, type TextElement } from '@/entities/canvas';
import { NumberField } from '@/shared/ui/number-field';
import { SegmentedControl } from '@/shared/ui/segmented-control';

import { ColorField } from '../../shared/color-field';
import { PropertySection } from '../../shared/property-section';
import { FontPicker } from './text-style-section/font-picker';

const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 240;

const ALIGN_OPTIONS: readonly { value: TextAlign; label: ReactNode; ariaLabel: string }[] = [
  { value: 'left', label: <AlignLeft />, ariaLabel: 'Align left' },
  { value: 'center', label: <AlignCenter />, ariaLabel: 'Align centre' },
  { value: 'right', label: <AlignRight />, ariaLabel: 'Align right' },
];

// Font, size, alignment and colour for the selected text.
export function TextStyleSection({ element }: { element: TextElement }) {
  const styleText = useCanvasStore((state) => state.styleText);
  return (
    <PropertySection title="Text">
      <FontPicker element={element} />
      <div className="flex items-center gap-3">
        <Slider
          min={MIN_FONT_SIZE}
          max={MAX_FONT_SIZE}
          step={1}
          value={[element.fontSize]}
          aria-label="Font size"
          onValueChange={([fontSize]) => {
            if (fontSize !== undefined) styleText(element.id, { fontSize }, 'continuous');
          }}
          className="flex-1"
        />
        <NumberField
          prefix="Aa"
          ariaLabel="Font size"
          value={element.fontSize}
          min={MIN_FONT_SIZE}
          max={MAX_FONT_SIZE}
          onCommit={(fontSize) => styleText(element.id, { fontSize })}
          className="w-24"
        />
      </div>
      <SegmentedControl
        ariaLabel="Text alignment"
        value={element.align}
        options={ALIGN_OPTIONS}
        onChange={(align) => styleText(element.id, { align })}
      />
      <ColorField
        label="Text colour"
        value={element.color}
        onChange={(color, pace) => styleText(element.id, { color }, pace)}
      />
    </PropertySection>
  );
}
