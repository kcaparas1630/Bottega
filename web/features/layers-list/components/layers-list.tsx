'use client';

import { Layers } from 'lucide-react';

import { useCanvasStore } from '@/entities/canvas';

import { LayerRow } from './layers-list/layer-row';

// Every element on the page, front-most first, as in a stack of cut paper.
export function LayersList() {
  const elements = useCanvasStore((state) => state.design?.elements);
  const selectedElementId = useCanvasStore((state) => state.selectedElementId);
  const selectElement = useCanvasStore((state) => state.selectElement);
  if (!elements) return null;

  if (elements.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 px-6 py-12 text-center text-sm text-brick-ink/60">
        <Layers aria-hidden className="size-5" />
        The page is empty. Add a photo, text or a shape from the dock.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-3">
      <p className="px-2 pt-2 text-[13px] text-brick-ink/55">
        Front-most at the top. Reorder from Design → Layer.
      </p>
      <ul aria-label="Layers" className="flex flex-col gap-0.5">
        {[...elements].reverse().map((element) => (
          <li key={element.id}>
            <LayerRow
              element={element}
              isSelected={element.id === selectedElementId}
              onSelect={() => selectElement(element.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
