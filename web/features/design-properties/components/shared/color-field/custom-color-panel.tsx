import { useMemo } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';

import { Button } from '@/components/ui/button';
import { useCanvasStore, type CanvasDesign, type EditPace } from '@/entities/canvas';

type CustomColorPanelProps = {
  value: string;
  onChange: (hexColor: string, pace?: EditPace) => void;
};

const MAX_DESIGN_COLORS = 14;

// Every distinct colour already on the page: paper, text ink and shape fills.
function collectDesignColors(design: CanvasDesign | null) {
  if (!design) return [];
  const colors = [design.paperColor];
  for (const element of design.elements) {
    if (element.kind === 'text') colors.push(element.color);
    if (element.kind === 'shape') colors.push(element.fill);
  }
  return [...new Set(colors.map((color) => color.toLowerCase()))].slice(0, MAX_DESIGN_COLORS);
}

// Any colour: a saturation and hue picker, an exact hex field, and the colours already in use.
export function CustomColorPanel({ value, onChange }: CustomColorPanelProps) {
  const design = useCanvasStore((state) => state.design);
  const designColors = useMemo(() => collectDesignColors(design), [design]);
  return (
    <div className="flex flex-col gap-3">
      <HexColorPicker
        color={value}
        onChange={(hexColor) => onChange(hexColor, 'continuous')}
        className="h-44! w-full! [&_.react-colorful\_\_last-control]:rounded-b-md [&_.react-colorful\_\_saturation]:rounded-t-md"
      />
      <label className="flex h-10 items-center gap-2 rounded-md border border-brick-ink/25 bg-white/70 px-2.5 text-sm focus-within:border-shop-green focus-within:ring-2 focus-within:ring-shop-green/20">
        <span className="text-xs font-semibold text-brick-ink/50">HEX</span>
        <HexColorInput
          prefixed
          color={value}
          aria-label="Hex colour"
          onChange={(hexColor) => onChange(hexColor, 'continuous')}
          className="w-full min-w-0 bg-transparent font-medium text-brick-ink uppercase tabular-nums outline-none"
        />
      </label>
      <div className="flex flex-col gap-2">
        <span className="label-caps text-brick-ink/55">In this design</span>
        <div className="flex flex-wrap gap-1.5">
          {designColors.map((color) => (
            <Button
              key={color}
              type="button"
              variant="ghost"
              aria-label={`Use ${color}`}
              title={color.toUpperCase()}
              onClick={() => onChange(color)}
              className="size-6 rounded-full border border-brick-ink/25 p-0 outline-none hover:ring-2 hover:ring-brick-ink/20 hover:ring-offset-1 focus-visible:ring-2 focus-visible:ring-shop-green"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
