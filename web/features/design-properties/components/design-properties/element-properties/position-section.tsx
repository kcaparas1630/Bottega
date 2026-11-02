import {
  AlignCenterHorizontal,
  AlignCenterVertical,
  AlignEndHorizontal,
  AlignEndVertical,
  AlignStartHorizontal,
  AlignStartVertical,
} from 'lucide-react';
import type { ReactNode } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useCanvasStore, type CanvasElement } from '@/entities/canvas';
import { NumberField } from '@/shared/ui/number-field';

import { alignToPage, type PageAlignment } from '../../../lib/align-to-page';
import { PropertySection } from '../../shared/property-section';

const ALIGNMENT_OPTIONS: readonly { alignment: PageAlignment; label: string; icon: ReactNode }[] = [
  { alignment: 'left', label: 'Align left', icon: <AlignStartVertical /> },
  { alignment: 'center', label: 'Align centre', icon: <AlignCenterVertical /> },
  { alignment: 'right', label: 'Align right', icon: <AlignEndVertical /> },
  { alignment: 'top', label: 'Align top', icon: <AlignStartHorizontal /> },
  { alignment: 'middle', label: 'Align middle', icon: <AlignCenterHorizontal /> },
  { alignment: 'bottom', label: 'Align bottom', icon: <AlignEndHorizontal /> },
];

// Align to the page in one tap, or place exactly with X and Y.
export function PositionSection({ element }: { element: CanvasElement }) {
  const page = useCanvasStore((state) => state.design);
  const setElementFrame = useCanvasStore((state) => state.setElementFrame);
  if (!page) return null;

  return (
    <PropertySection title="Position">
      <div
        role="group"
        aria-label="Align to page"
        className="grid grid-cols-6 gap-[3px] rounded-md border border-brick-ink/25 bg-white/50 p-[3px]"
      >
        {ALIGNMENT_OPTIONS.map(({ alignment, label, icon }) => (
          <Tooltip key={alignment}>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                aria-label={label}
                onClick={() => setElementFrame(element.id, alignToPage(element, page, alignment))}
                className="h-9 w-full rounded-sm px-0 text-brick-ink/75 hover:bg-brick-ink hover:text-mortar-cream [&_svg:not([class*='size-'])]:size-[18px]"
              >
                {icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
      <div className="flex gap-1.5">
        <NumberField
          prefix="X"
          ariaLabel="X position"
          value={element.x}
          onCommit={(x) => setElementFrame(element.id, { x })}
          className="flex-1"
        />
        <NumberField
          prefix="Y"
          ariaLabel="Y position"
          value={element.y}
          onCommit={(y) => setElementFrame(element.id, { y })}
          className="flex-1"
        />
      </div>
    </PropertySection>
  );
}
