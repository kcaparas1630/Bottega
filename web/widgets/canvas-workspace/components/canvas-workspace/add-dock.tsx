import { useState, type ReactNode } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ShapePresetMenu } from '@/features/add-shape';
import { TextPresetMenu } from '@/features/add-text';
import { PhotoShelf } from '@/features/photo-shelf';
import { cn } from '@/shared/lib/cn';

import { LETTER_TILES, PAPER_SHAPES, PHOTO_PRINTS } from './add-dock/counter-goods';
import { CounterItem } from './add-dock/counter-item';

type DockTool = 'photos' | 'text' | 'shapes';

type DockPanel = {
  tool: DockTool;
  label: string;
  goods: ReactNode;
  panelClassName: string;
  panel: ReactNode;
};

// The counter: each of its goods opens a picker above it, which closes once something lands.
export function AddDock({ className }: { className?: string }) {
  const [openTool, setOpenTool] = useState<DockTool | null>(null);
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);
  const closePanel = () => setOpenTool(null);

  const panels: readonly DockPanel[] = [
    {
      tool: 'photos',
      label: 'Photos',
      goods: PHOTO_PRINTS,
      panelClassName: 'h-[min(600px,calc(100dvh-150px))] w-[min(680px,calc(100vw-440px))]',
      panel: <PhotoShelf onPhotoPlaced={closePanel} onDragActiveChange={setIsDraggingPhoto} />,
    },
    {
      tool: 'text',
      label: 'Text',
      goods: LETTER_TILES,
      panelClassName: 'w-80',
      panel: <TextPresetMenu onTextAdded={closePanel} />,
    },
    {
      tool: 'shapes',
      label: 'Shapes',
      goods: PAPER_SHAPES,
      panelClassName: 'w-[360px]',
      panel: <ShapePresetMenu onShapeAdded={closePanel} />,
    },
  ];

  return (
    <div
      role="toolbar"
      aria-label="Add to the page"
      className={cn(
        'flex items-end gap-1 rounded-xl bg-brick-ink p-1.5 shadow-float ring-1 ring-black/20',
        className,
      )}
    >
      <span aria-hidden className="absolute inset-x-5 -top-[3px] h-[3px] rounded-t-sm bg-clay/90" />
      {panels.map(({ tool, label, goods, panelClassName, panel }) => (
        <Popover
          key={tool}
          open={openTool === tool}
          onOpenChange={(isOpen) => setOpenTool(isOpen ? tool : null)}
        >
          <PopoverTrigger asChild>
            <CounterItem goods={goods} label={label} isActive={openTool === tool} />
          </PopoverTrigger>
          <PopoverContent
            side="top"
            sideOffset={10}
            collisionPadding={16}
            className={cn(
              'flex flex-col overflow-hidden rounded-lg border border-brick-ink/15 bg-mortar-cream p-0 shadow-float transition-opacity duration-150',
              panelClassName,
              isDraggingPhoto && 'pointer-events-none opacity-0',
            )}
          >
            {panel}
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}
