import { Button } from '@/components/ui/button';
import type { CanvasElement } from '@/entities/canvas';
import { cn } from '@/shared/lib/cn';

import { LayerThumbnail } from './layer-row/layer-thumbnail';

type LayerRowProps = {
  element: CanvasElement;
  isSelected: boolean;
  onSelect: () => void;
};

const KIND_LABELS: Record<CanvasElement['kind'], string> = {
  image: 'Photo',
  text: 'Text',
  shape: 'Shape',
};

function nameOf(element: CanvasElement) {
  if (element.kind === 'image') return element.photoTitle;
  if (element.kind === 'text') return element.content || 'Empty text';
  return element.shape.charAt(0).toUpperCase() + element.shape.slice(1);
}

export function LayerRow({ element, isSelected, onSelect }: LayerRowProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      aria-pressed={isSelected}
      onClick={onSelect}
      className={cn(
        'h-auto w-full justify-start gap-3 rounded-md border px-2.5 py-2 text-left font-normal transition-colors duration-150 outline-none hover:text-brick-ink focus-visible:ring-2 focus-visible:ring-shop-green/40',
        isSelected
          ? 'border-brick-ink bg-mustard/30 shadow-hairline hover:bg-mustard/30'
          : 'border-transparent hover:border-brick-ink/30 hover:bg-white/60',
      )}
    >
      <span className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-brick-ink/25 bg-white">
        <LayerThumbnail element={element} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-brick-ink">{nameOf(element)}</span>
        <span className="block label-caps text-brick-ink/50">{KIND_LABELS[element.kind]}</span>
      </span>
    </Button>
  );
}
