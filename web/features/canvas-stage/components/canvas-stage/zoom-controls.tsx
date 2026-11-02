import { Maximize, Minus, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/shared/lib/cn';

type ZoomControlsProps = {
  zoom: {
    scale: number;
    isFitted: boolean;
    zoomIn: () => void;
    zoomOut: () => void;
    fitToScreen: () => void;
    showActualSize: () => void;
  };
  className?: string;
};

// Zoom out, the current level (click for 100%), zoom in, and fit to screen.
export function ZoomControls({ zoom, className }: ZoomControlsProps) {
  return (
    <div
      role="toolbar"
      aria-label="Zoom"
      className={cn(
        'flex items-center gap-0.5 rounded-lg border border-brick-ink/15 bg-chrome p-1 shadow-float',
        className,
      )}
    >
      <Button variant="ghost" size="icon-sm" aria-label="Zoom out" onClick={zoom.zoomOut}>
        <Minus />
      </Button>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            onClick={zoom.showActualSize}
            className="h-8 w-14 rounded-sm px-0 text-[13px] font-bold tabular-nums hover:bg-warm-sand"
          >
            {Math.round(zoom.scale * 100)}%
          </Button>
        </TooltipTrigger>
        <TooltipContent>Actual size</TooltipContent>
      </Tooltip>
      <Button variant="ghost" size="icon-sm" aria-label="Zoom in" onClick={zoom.zoomIn}>
        <Plus />
      </Button>
      <span aria-hidden className="mx-0.5 h-5 w-px bg-brick-ink/10" />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Fit to screen"
            aria-pressed={zoom.isFitted}
            onClick={zoom.fitToScreen}
            className="aria-pressed:text-brick-red"
          >
            <Maximize />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Fit to screen</TooltipContent>
      </Tooltip>
    </div>
  );
}
