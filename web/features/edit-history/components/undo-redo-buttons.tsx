'use client';

import { Redo2, Undo2 } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useCanvasStore } from '@/entities/canvas';

import { useHistoryShortcuts } from '../hooks/use-history-shortcuts';

// Undo and redo, with the usual keyboard shortcuts wired up alongside.
export function UndoRedoButtons() {
  const canUndo = useCanvasStore((state) => state.history.past.length > 0);
  const canRedo = useCanvasStore((state) => state.history.future.length > 0);
  const undo = useCanvasStore((state) => state.undo);
  const redo = useCanvasStore((state) => state.redo);
  useHistoryShortcuts();

  const buttons = [
    { label: 'Undo', shortcut: 'Ctrl Z', icon: <Undo2 />, isEnabled: canUndo, run: undo },
    { label: 'Redo', shortcut: 'Ctrl Shift Z', icon: <Redo2 />, isEnabled: canRedo, run: redo },
  ];
  return (
    <div className="flex items-center">
      {buttons.map(({ label, shortcut, icon, isEnabled, run }) => (
        <Tooltip key={label}>
          <TooltipTrigger asChild>
            <span>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={label}
                disabled={!isEnabled}
                onClick={run}
                className="text-brick-ink/80 hover:bg-brick-ink/8 hover:text-brick-ink focus-visible:ring-2 focus-visible:ring-shop-green/40 disabled:text-brick-ink/30 disabled:opacity-100 [&_svg]:stroke-[1.75] [&_svg:not([class*='size-'])]:size-[18px]"
              >
                {icon}
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            {label} <span className="opacity-60">{shortcut}</span>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
