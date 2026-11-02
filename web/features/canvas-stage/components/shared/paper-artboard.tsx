import type { ComponentProps } from 'react';

import type { CanvasDesign } from '@/entities/canvas';
import { cn } from '@/shared/lib/cn';

type PaperArtboardProps = ComponentProps<'div'> & {
  design: CanvasDesign;
  scale: number;
};

// A sheet of warm paper at screen size, faintly grained; children are laid out in design units and scaled down.
export function PaperArtboard({
  design,
  scale,
  className,
  children,
  ...divProps
}: PaperArtboardProps) {
  return (
    <div
      {...divProps}
      className={cn('relative shrink-0 overflow-hidden rounded-[2px]', className)}
      style={{
        width: design.width * scale,
        height: design.height * scale,
        backgroundColor: design.paperColor,
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 paper-grain" />
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: design.width, height: design.height, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
