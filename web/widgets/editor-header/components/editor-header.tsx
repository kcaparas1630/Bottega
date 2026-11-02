'use client';

import { CanvasSnapshot } from '@/features/canvas-stage';
import { CanvasSyncStatus } from '@/features/canvas-sync';
import { UndoRedoButtons } from '@/features/edit-history';
import { ExportDesign } from '@/features/export-design';
import { CanvasNameField } from '@/features/rename-canvas';
import { ShopSign } from '@/shared/ui/shop-sign';

// The fascia: flat deli green with the name sign-written on it, a brass rule and a brick band below.
export function EditorHeader() {
  return (
    <header className="relative z-20 shrink-0">
      <div className="flex h-14 items-center gap-4 bg-shop-green px-5">
        <ShopSign />
        <div className="ml-2 flex h-9 items-center gap-1 rounded-md bg-chrome pr-1 shadow-hairline">
          <CanvasNameField />
          <span aria-hidden className="h-5 w-px bg-brick-ink/12" />
          <UndoRedoButtons />
        </div>
        <div className="flex-1" />
        <div className="flex h-8 items-center rounded-md bg-chrome px-2.5 shadow-hairline">
          <CanvasSyncStatus />
        </div>
        <ExportDesign renderDesign={(widthPx) => <CanvasSnapshot width={widthPx} />} />
      </div>
      <div aria-hidden className="h-px bg-mustard/70" />
      <div aria-hidden className="h-1 bg-brick-red" />
    </header>
  );
}
