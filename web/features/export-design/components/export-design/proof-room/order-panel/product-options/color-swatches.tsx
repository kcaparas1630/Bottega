import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { ProductColor } from '@/entities/product';

import { OptionLabel } from '../shared/option-label';

type ColorSwatchesProps = {
  label: string;
  colors: readonly ProductColor[];
  value: string;
  onChange: (colorId: string) => void;
};

// Round swatches of the colours a product comes in; the chosen one gets an ink ring.
export function ColorSwatches({ label, colors, value, onChange }: ColorSwatchesProps) {
  const chosenColor = colors.find((color) => color.id === value);
  return (
    <div className="grid gap-2.5">
      <OptionLabel label={label} value={chosenColor?.name} />
      <ToggleGroup
        type="single"
        spacing={2}
        aria-label={label}
        value={value}
        onValueChange={(colorId) => {
          if (colorId) onChange(colorId);
        }}
        className="flex-wrap gap-3"
      >
        {colors.map((color) => (
          <ToggleGroupItem
            key={color.id}
            value={color.id}
            aria-label={color.name}
            title={color.name}
            className="size-9 rounded-full border border-brick-ink/20 p-0 shadow-hairline ring-offset-2 ring-offset-mortar-cream transition-shadow duration-150 data-[state=on]:ring-2 data-[state=on]:ring-brick-ink"
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </ToggleGroup>
    </div>
  );
}
