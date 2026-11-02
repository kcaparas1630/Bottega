'use client';

import { Button } from '@/components/ui/button';
import { SHAPE_BORDER_RADIUS, useCanvasStore, type ShapeKind } from '@/entities/canvas';
import { cn } from '@/shared/lib/cn';

const SHAPE_OPTIONS: readonly { shape: ShapeKind; label: string; previewClassName: string }[] = [
  { shape: 'rectangle', label: 'Rectangle', previewClassName: 'h-6 w-8' },
  { shape: 'rounded', label: 'Rounded', previewClassName: 'h-6 w-8' },
  { shape: 'ellipse', label: 'Circle', previewClassName: 'size-7' },
  { shape: 'arch', label: 'Arch', previewClassName: 'h-8 w-6' },
];

// Simple filled shapes for backgrounds and frames; colour is set afterwards in the inspector.
export function ShapePresetMenu({ onShapeAdded }: { onShapeAdded: () => void }) {
  const addShape = useCanvasStore((state) => state.addShape);
  return (
    <section aria-label="Shapes" className="flex flex-col gap-2 p-3">
      <h2 className="px-1 label-caps font-sans tracking-[0.08em] text-brick-ink/60">Shapes</h2>
      <div className="grid grid-cols-4 gap-1.5">
        {SHAPE_OPTIONS.map(({ shape, label, previewClassName }) => (
          <Button
            key={shape}
            type="button"
            variant="outline"
            onClick={() => {
              addShape(shape);
              onShapeAdded();
            }}
            className="flex h-auto flex-col items-center gap-1.5 rounded-md border border-brick-ink/12 bg-white/50 pt-3 pb-2 text-[11px] font-medium text-brick-ink/75 shadow-none transition-colors outline-none hover:border-brick-ink/35 hover:bg-white hover:text-brick-ink focus-visible:ring-2 focus-visible:ring-shop-green/40"
          >
            <span className="flex h-9 items-center">
              <span
                aria-hidden
                className={cn('block border-[1.5px] border-brick-ink/70', previewClassName)}
                style={{
                  borderRadius: shape === 'rounded' ? '5px' : SHAPE_BORDER_RADIUS[shape],
                }}
              />
            </span>
            {label}
          </Button>
        ))}
      </div>
    </section>
  );
}
