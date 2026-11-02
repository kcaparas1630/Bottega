'use client';

import { useCanvasStore } from '@/entities/canvas';

import { CanvasElementView } from './shared/canvas-element-view';
import { PaperArtboard } from './shared/paper-artboard';

// A read-only print of the current design at any pixel width, for previews and mockups.
export function CanvasSnapshot({ width }: { width: number }) {
  const design = useCanvasStore((state) => state.design);
  if (!design || width <= 0) return null;
  return (
    <PaperArtboard design={design} scale={width / design.width} role="img" aria-label="Your design">
      {design.elements.map((element) => (
        <div
          key={element.id}
          className="absolute"
          style={{ left: element.x, top: element.y, width: element.width, height: element.height }}
        >
          <CanvasElementView element={element} />
        </div>
      ))}
    </PaperArtboard>
  );
}
