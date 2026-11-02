import { Link2, Unlink2 } from 'lucide-react';
import { useState } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { useCanvasStore, type CanvasElement } from '@/entities/canvas';
import { cn } from '@/shared/lib/cn';
import { NumberField } from '@/shared/ui/number-field';

import {
  ASPECT_RATIO_PRESETS,
  hasAspectRatio,
  reshapeToAspectRatio,
  resizeSide,
} from '../../../lib/aspect-ratio';
import { PropertySection } from '../../shared/property-section';

const MIN_SIDE = 8;
const MAX_SIDE = 6000;

function ratioChoicesFor(element: CanvasElement) {
  if (element.kind === 'text') return [];
  const original =
    element.kind === 'image' ? [{ label: 'Original', ratio: element.photoAspectRatio }] : [];
  return [...original, ...ASPECT_RATIO_PRESETS];
}

// Exact width and height, a ratio lock, and one-tap aspect ratios for photos and shapes.
export function SizeSection({ element }: { element: CanvasElement }) {
  const setElementFrame = useCanvasStore((state) => state.setElementFrame);
  const [isRatioLocked, setIsRatioLocked] = useState(element.kind === 'image');
  const ratioChoices = ratioChoicesFor(element);
  const sideField = (side: 'width' | 'height') => (
    <NumberField
      prefix={side === 'width' ? 'W' : 'H'}
      ariaLabel={side === 'width' ? 'Width' : 'Height'}
      value={element[side]}
      min={MIN_SIDE}
      max={MAX_SIDE}
      onCommit={(length) =>
        setElementFrame(element.id, resizeSide(element, side, length, isRatioLocked))
      }
      className="flex-1"
    />
  );

  return (
    <PropertySection title="Size">
      <div className="flex items-center gap-1.5">
        {sideField('width')}
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              aria-label="Lock aspect ratio"
              pressed={isRatioLocked}
              onPressedChange={setIsRatioLocked}
              className="size-10 shrink-0 text-brick-ink/50 hover:bg-brick-ink/8 hover:text-brick-ink data-[state=on]:bg-transparent data-[state=on]:text-brick-red"
            >
              {isRatioLocked ? (
                <Link2 className="size-[18px]" />
              ) : (
                <Unlink2 className="size-[18px]" />
              )}
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>{isRatioLocked ? 'Unlock' : 'Lock'} aspect ratio</TooltipContent>
        </Tooltip>
        {sideField('height')}
      </div>
      {ratioChoices.length > 0 && (
        <div role="group" aria-label="Aspect ratio" className="flex flex-wrap gap-1.5">
          {ratioChoices.map(({ label, ratio }) => (
            <Button
              key={label}
              type="button"
              variant="outline"
              aria-pressed={hasAspectRatio(element, ratio)}
              onClick={() => setElementFrame(element.id, reshapeToAspectRatio(element, ratio))}
              className={cn(
                'h-9 rounded-md pressable px-2 text-[13px] font-bold tabular-nums has-[>svg]:px-2',
                hasAspectRatio(element, ratio)
                  ? 'bg-brick-ink text-mortar-cream hover:bg-brick-ink hover:text-mortar-cream'
                  : 'bg-white/60 text-brick-ink hover:bg-white hover:text-brick-ink',
              )}
            >
              {label}
            </Button>
          ))}
        </div>
      )}
    </PropertySection>
  );
}
