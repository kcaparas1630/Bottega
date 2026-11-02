'use client';

import { cn } from '@/shared/lib/cn';

import { useCanvasSync, type CanvasSyncState } from '../hooks/use-canvas-sync';

const STATUS_COPY: Record<CanvasSyncState, string> = {
  loading: 'Opening…',
  saving: 'Saving…',
  saved: 'All changes saved',
  failed: "Couldn't save",
};

const STATUS_DOT_CLASS: Record<CanvasSyncState, string> = {
  loading: 'bg-mustard',
  saving: 'bg-mustard',
  saved: 'bg-shop-green',
  failed: 'bg-clay',
};

// Keeps the design in sync with the server and says so in one quiet line.
export function CanvasSyncStatus() {
  const syncState = useCanvasSync();
  return (
    <p
      role="status"
      className="flex shrink-0 items-center gap-1.5 text-xs whitespace-nowrap text-brick-ink/70"
    >
      <span aria-hidden className={cn('size-1.5 rounded-full', STATUS_DOT_CLASS[syncState])} />
      {STATUS_COPY[syncState]}
    </p>
  );
}
