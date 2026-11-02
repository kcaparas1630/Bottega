import { Copy, Shapes, Trash2, Type } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useCanvasStore, type CanvasElement } from '@/entities/canvas';

const KIND_LABELS: Record<CanvasElement['kind'], string> = {
  image: 'Photo',
  text: 'Text',
  shape: 'Shape',
};

function describeElement(element: CanvasElement) {
  if (element.kind === 'image') return element.photoTitle;
  if (element.kind === 'text') return element.content || 'Empty text';
  return element.shape.charAt(0).toUpperCase() + element.shape.slice(1);
}

// Names the selection, with the two actions that apply to anything: duplicate and delete.
export function ElementHeader({ element }: { element: CanvasElement }) {
  const duplicateElement = useCanvasStore((state) => state.duplicateElement);
  const removeElement = useCanvasStore((state) => state.removeElement);
  return (
    <header className="flex items-center gap-3 border-b border-brick-ink/12 px-5 py-4">
      <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-brick-ink/25 bg-white text-brick-ink/70 shadow-hairline">
        {element.kind === 'image' ? (
          <Image src={element.photoUrl} alt="" fill sizes="48px" className="object-cover" />
        ) : element.kind === 'text' ? (
          <Type className="size-5" />
        ) : (
          <Shapes className="size-5" />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block label-caps text-brick-ink/50">{KIND_LABELS[element.kind]}</span>
        <span className="block truncate font-serif-display text-xl leading-tight font-bold text-brick-ink">
          {describeElement(element)}
        </span>
      </span>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Duplicate"
            onClick={() => duplicateElement(element.id)}
          >
            <Copy />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Duplicate</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Delete"
            onClick={() => removeElement(element.id)}
            className="-ml-2 hover:text-brick-red"
          >
            <Trash2 />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Delete</TooltipContent>
      </Tooltip>
    </header>
  );
}
