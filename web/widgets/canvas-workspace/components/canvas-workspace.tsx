'use client';

import { CanvasStage } from '@/features/canvas-stage';

import { AddDock } from './canvas-workspace/add-dock';

// The workspace: flat Warm Sand so the paper page is the hero, with the add dock below it.
export function CanvasWorkspace() {
  return (
    <main aria-label="Canvas" className="relative min-w-0 flex-1 bg-workspace">
      <CanvasStage />
      <AddDock className="absolute bottom-4 left-1/2 -translate-x-1/2" />
    </main>
  );
}
