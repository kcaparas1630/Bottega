import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { useCanvasStore } from '@/entities/canvas';
import type { LibraryPhoto } from '@/entities/photo';

export function SuggestedPhotos({ photos }: { photos: readonly LibraryPhoto[] }) {
  const addPhoto = useCanvasStore((state) => state.addPhoto);
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Suggested photos">
      {photos.map((photo) => (
        <li key={photo.id}>
          <Button
            type="button"
            variant="ghost"
            title={`Place "${photo.title}" on the paper`}
            onClick={() => addPhoto(photo)}
            className="relative block h-16 overflow-hidden rounded-hand-sm p-0 shadow-paper transition duration-300 ease-settle outline-none hover:-translate-y-0.5 hover:bg-transparent hover:shadow-paper-lifted focus-visible:ring-2 focus-visible:ring-ring"
            style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
          >
            <Image
              src={photo.thumbnailUrl}
              alt={photo.title}
              fill
              sizes="120px"
              className="object-cover"
            />
          </Button>
        </li>
      ))}
    </ul>
  );
}
