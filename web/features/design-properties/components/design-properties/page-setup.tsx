import { MousePointerClick } from 'lucide-react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { PAGE_SIZE_PRESETS, useCanvasStore } from '@/entities/canvas';

import { ColorField } from '../shared/color-field';
import { PropertySection } from '../shared/property-section';

const PRESET_PREVIEW_SIZE = 34;

// With nothing selected the page itself is the subject: its size and its paper colour.
export function PageSetup() {
  const design = useCanvasStore((state) => state.design);
  const resizePage = useCanvasStore((state) => state.resizePage);
  const setPaperColor = useCanvasStore((state) => state.setPaperColor);
  if (!design) return null;
  const chosenPreset = PAGE_SIZE_PRESETS.find(
    (preset) => preset.width === design.width && preset.height === design.height,
  );

  return (
    <div className="flex flex-col">
      <PropertySection title="Page size">
        <ToggleGroup
          type="single"
          spacing={2}
          aria-label="Page size"
          value={chosenPreset?.name ?? ''}
          onValueChange={(presetName) => {
            const preset = PAGE_SIZE_PRESETS.find(({ name }) => name === presetName);
            if (preset) resizePage(preset.width, preset.height);
          }}
          className="grid w-full grid-cols-2"
        >
          {PAGE_SIZE_PRESETS.map((preset) => (
            <ToggleGroupItem
              key={preset.name}
              value={preset.name}
              className="h-auto w-full flex-col gap-2 rounded-md pressable bg-white/60 px-3 pt-4 pb-3 text-center text-brick-ink hover:bg-white hover:text-brick-ink focus-visible:ring-2 focus-visible:ring-shop-green/40 data-[state=on]:bg-brick-ink data-[state=on]:text-mortar-cream data-[state=on]:hover:bg-brick-ink data-[state=on]:hover:text-mortar-cream"
            >
              <span className="flex h-10 items-center justify-center">
                <span
                  aria-hidden
                  className="block rounded-[3px] border-2 border-current"
                  style={{
                    height: PRESET_PREVIEW_SIZE * Math.min(1, preset.height / preset.width),
                    width: PRESET_PREVIEW_SIZE * Math.min(1, preset.width / preset.height),
                  }}
                />
              </span>
              <span>
                <span className="block text-sm font-medium">{preset.label}</span>
                <span className="block text-xs tabular-nums opacity-65">
                  {preset.ratioLabel} · {preset.width} × {preset.height}
                </span>
              </span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </PropertySection>
      <PropertySection title="Paper colour">
        <ColorField
          label="Paper colour"
          value={design.paperColor}
          onChange={(paperColor) => setPaperColor(paperColor)}
        />
      </PropertySection>
      <div className="m-5 flex gap-3 rounded-md border border-brick-ink/15 p-4 text-sm leading-relaxed text-brick-ink/80">
        <MousePointerClick aria-hidden className="mt-0.5 size-[18px] shrink-0 text-brick-red" />
        <p>
          Select anything on the page to edit it here. Add photos, text and shapes from the counter
          under the page.
        </p>
      </div>
    </div>
  );
}
