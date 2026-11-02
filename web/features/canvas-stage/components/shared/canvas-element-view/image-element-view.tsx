import Image from 'next/image';

import { IMAGE_FILTER_CSS, type ImageElement } from '@/entities/canvas';
import { cn } from '@/shared/lib/cn';

export function ImageElementView({ element }: { element: ImageElement }) {
  return (
    <div className="relative size-full overflow-hidden bg-warm-sand/40">
      <Image
        src={element.photoUrl}
        alt={element.photoTitle}
        fill
        draggable={false}
        sizes="(max-width: 1280px) 60vw, 900px"
        className={cn(
          'pointer-events-none select-none',
          element.crop === 'fill' ? 'object-cover' : 'object-contain',
        )}
        style={{ filter: IMAGE_FILTER_CSS[element.filter] }}
      />
    </div>
  );
}
