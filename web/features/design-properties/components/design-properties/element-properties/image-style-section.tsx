import Image from 'next/image';

import {
  IMAGE_FILTER_CSS,
  useCanvasStore,
  type ImageCrop,
  type ImageElement,
  type ImageFilter,
} from '@/entities/canvas';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/shared/lib/cn';
import { SegmentedControl } from '@/shared/ui/segmented-control';

import { PropertySection } from '../../shared/property-section';

const FILTER_OPTIONS: readonly { filter: ImageFilter; label: string }[] = [
  { filter: 'none', label: 'Natural' },
  { filter: 'warm', label: 'Warm' },
  { filter: 'mono', label: 'Mono' },
  { filter: 'faded', label: 'Faded' },
];

const CROP_OPTIONS: readonly { value: ImageCrop; label: string }[] = [
  { value: 'fill', label: 'Fill frame' },
  { value: 'fit', label: 'Whole photo' },
];

// Filters previewed on the photo itself, and whether it fills its frame or shows whole.
export function ImageStyleSection({ element }: { element: ImageElement }) {
  const styleImage = useCanvasStore((state) => state.styleImage);
  return (
    <PropertySection title="Photo">
      <ToggleGroup
        type="single"
        spacing={3}
        aria-label="Filter"
        value={element.filter}
        onValueChange={(chosenFilter) => {
          const option = FILTER_OPTIONS.find(({ filter }) => filter === chosenFilter);
          if (option) styleImage(element.id, { filter: option.filter });
        }}
        className="grid w-full grid-cols-2"
      >
        {FILTER_OPTIONS.map(({ filter, label }) => (
          <ToggleGroupItem
            key={filter}
            value={filter}
            className="group h-auto w-full flex-col gap-2 p-0 text-sm font-normal text-brick-ink/70 hover:bg-transparent hover:text-brick-ink focus-visible:ring-0 data-[state=on]:bg-transparent data-[state=on]:font-medium data-[state=on]:text-brick-ink"
          >
            <span
              className={cn(
                'relative block aspect-[16/10] w-full overflow-hidden rounded-md pressable bg-white p-1 group-focus-visible:ring-2 group-focus-visible:ring-shop-green',
                element.filter === filter && 'border-brick-ink bg-brick-ink',
              )}
            >
              <Image
                src={element.photoUrl}
                alt=""
                fill
                sizes="160px"
                className="object-cover p-1"
                style={{ filter: IMAGE_FILTER_CSS[filter] }}
              />
            </span>
            {label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <SegmentedControl
        ariaLabel="Fit"
        value={element.crop}
        options={CROP_OPTIONS}
        onChange={(crop) => styleImage(element.id, { crop })}
      />
    </PropertySection>
  );
}
