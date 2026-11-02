import { ArrowDown, ArrowUp, BringToFront, SendToBack } from 'lucide-react';
import type { ReactNode } from 'react';

import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useCanvasStore, type CanvasElement, type StackMove } from '@/entities/canvas';
import { NumberField } from '@/shared/ui/number-field';

import { PropertySection } from '../../shared/property-section';

const STACK_OPTIONS: readonly {
  move: StackMove;
  label: string;
  icon: ReactNode;
  isUpward: boolean;
}[] = [
  { move: 'forward', label: 'Forward', icon: <ArrowUp />, isUpward: true },
  { move: 'backward', label: 'Backward', icon: <ArrowDown />, isUpward: false },
  { move: 'front', label: 'To front', icon: <BringToFront />, isUpward: true },
  { move: 'back', label: 'To back', icon: <SendToBack />, isUpward: false },
];

const MIN_OPACITY_PERCENT = 10;

// Stacking order on the page, and how see-through the element is.
export function LayerSection({ element }: { element: CanvasElement }) {
  const moveElementInStack = useCanvasStore((state) => state.moveElementInStack);
  const setElementOpacity = useCanvasStore((state) => state.setElementOpacity);
  const isOnTop = useCanvasStore((state) => state.design?.elements.at(-1)?.id === element.id);
  const isAtBottom = useCanvasStore((state) => state.design?.elements[0]?.id === element.id);
  const opacityPercent = Math.round(element.opacity * 100);

  return (
    <PropertySection title="Layer">
      <div className="grid grid-cols-2 gap-2">
        {STACK_OPTIONS.map(({ move, label, icon, isUpward }) => (
          <Button
            key={move}
            type="button"
            variant="outline"
            disabled={isUpward ? isOnTop : isAtBottom}
            onClick={() => moveElementInStack(element.id, move)}
            className="h-10 gap-2 rounded-md pressable bg-white/60 text-sm font-medium text-brick-ink hover:bg-white hover:text-brick-ink [&_svg:not([class*='size-'])]:size-[18px]"
          >
            {icon}
            {label}
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span className="w-16 shrink-0 text-sm text-brick-ink/70">Opacity</span>
        <Slider
          min={MIN_OPACITY_PERCENT}
          max={100}
          step={1}
          value={[opacityPercent]}
          aria-label="Opacity"
          onValueChange={([percent]) => {
            if (percent !== undefined) setElementOpacity(element.id, percent / 100, 'continuous');
          }}
          className="flex-1"
        />
        <NumberField
          prefix="%"
          ariaLabel="Opacity percent"
          value={opacityPercent}
          min={MIN_OPACITY_PERCENT}
          max={100}
          onCommit={(percent) => setElementOpacity(element.id, percent / 100)}
          className="w-20"
        />
      </div>
    </PropertySection>
  );
}
