import { Plus } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { useCanvasStore } from '@/entities/canvas';
import { writePhotoToDrag, type LibraryPhoto } from '@/entities/photo';

type ShelfPhotoTileProps = {
  photo: LibraryPhoto;
  onPhotoPlaced: () => void;
  onDragActiveChange: (isDragging: boolean) => void;
};

// A print on the shelf: set straight in a white mat, title and photographer on hover.
export function ShelfPhotoTile({ photo, onPhotoPlaced, onDragActiveChange }: ShelfPhotoTileProps) {
  const addPhoto = useCanvasStore((state) => state.addPhoto);
  return (
    <Button
      type="button"
      variant="ghost"
      draggable
      aria-label={`Place "${photo.title}" by ${photo.photographer}`}
      onClick={() => {
        addPhoto(photo);
        onPhotoPlaced();
      }}
      onDragStart={(event) => {
        writePhotoToDrag(event.dataTransfer, photo);
        onDragActiveChange(true);
      }}
      onDragEnd={(event) => {
        onDragActiveChange(false);
        if (event.dataTransfer.dropEffect !== 'none') onPhotoPlaced();
      }}
      className="group block h-auto w-full cursor-grab overflow-hidden rounded-[4px] p-0 outline-none hover:bg-transparent focus-visible:ring-2 focus-visible:ring-shop-green focus-visible:ring-offset-2 active:cursor-grabbing"
    >
      <span
        className="relative block overflow-hidden bg-warm-sand"
        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      >
        <Image
          src={photo.thumbnailUrl}
          alt=""
          fill
          draggable={false}
          sizes="240px"
          className="object-cover"
        />
        <span
          aria-hidden
          className="absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-md bg-white/95 text-brick-ink opacity-0 shadow-hairline transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <Plus className="size-3.5" />
        </span>
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 translate-y-1 bg-brick-ink/85 px-2.5 py-2 text-left opacity-0 transition duration-200 ease-settle group-hover:translate-y-0 group-hover:opacity-100"
        >
          <span className="block truncate text-xs font-semibold text-mortar-cream">
            {photo.title}
          </span>
          <span className="block truncate text-[11px] text-mortar-cream/70">
            {photo.photographer}
          </span>
        </span>
      </span>
    </Button>
  );
}
