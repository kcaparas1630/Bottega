import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { EditPace } from '@/entities/canvas';
import { PALETTE_COLOR_NAMES, PALETTE_COLORS } from '@/shared/config/palette-colors';
import { cn } from '@/shared/lib/cn';

import { CustomColorPanel } from './color-field/custom-color-panel';

type ColorFieldProps = {
  label: string;
  value: string;
  onChange: (hexColor: string, pace?: EditPace) => void;
};

const SWATCH_CLASS =
  'size-8 rounded-full border border-brick-ink/25 transition-shadow duration-150 outline-none hover:ring-2 hover:ring-brick-ink/15 hover:ring-offset-2 hover:ring-offset-chrome focus-visible:ring-2 focus-visible:ring-shop-green focus-visible:ring-offset-2';
const CHOSEN_CLASS = 'ring-2 ring-brick-ink ring-offset-2 ring-offset-chrome hover:ring-brick-ink';
const CHOSEN_SWATCH_CLASS =
  'data-[state=on]:ring-2 data-[state=on]:ring-brick-ink data-[state=on]:ring-offset-2 data-[state=on]:ring-offset-chrome';

function isSameColor(first: string, second: string) {
  return first.toLowerCase() === second.toLowerCase();
}

// The seven house colours in one tap, plus a custom swatch that opens the full picker beside the panel.
export function ColorField({ label, value, onChange }: ColorFieldProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const chosenHouseColor = PALETTE_COLOR_NAMES.find((name) =>
    isSameColor(PALETTE_COLORS[name].hex, value),
  );
  return (
    <Popover open={isPickerOpen} onOpenChange={setIsPickerOpen}>
      <PopoverAnchor asChild>
        <div className="flex items-center gap-2.5">
          <ToggleGroup
            type="single"
            spacing={1}
            aria-label={label}
            value={chosenHouseColor ?? ''}
            onValueChange={(colorName) => {
              const houseColor = PALETTE_COLOR_NAMES.find((name) => name === colorName);
              if (houseColor) onChange(PALETTE_COLORS[houseColor].hex);
            }}
            className="flex-1 justify-between"
          >
            {PALETTE_COLOR_NAMES.map((colorName) => (
              <ToggleGroupItem
                key={colorName}
                value={colorName}
                aria-label={PALETTE_COLORS[colorName].label}
                title={PALETTE_COLORS[colorName].label}
                className={cn(SWATCH_CLASS, 'min-w-0 p-0', CHOSEN_SWATCH_CLASS)}
                style={{ backgroundColor: PALETTE_COLORS[colorName].hex }}
              />
            ))}
          </ToggleGroup>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              aria-label={`Custom ${label.toLowerCase()}`}
              aria-pressed={!chosenHouseColor}
              title="Any colour"
              className={cn(
                SWATCH_CLASS,
                'p-0 text-brick-ink/60 hover:text-brick-ink',
                chosenHouseColor ? 'border-dashed bg-white/60 hover:bg-white' : CHOSEN_CLASS,
              )}
              style={chosenHouseColor ? undefined : { backgroundColor: value }}
            >
              {chosenHouseColor && <Plus className="size-4" />}
            </Button>
          </PopoverTrigger>
        </div>
      </PopoverAnchor>
      <PopoverContent
        side="left"
        align="start"
        sideOffset={36}
        collisionPadding={16}
        className="w-64 rounded-lg border-brick-ink/15 bg-mortar-cream p-3 shadow-float"
      >
        <CustomColorPanel value={value} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
}
