import { useListPhotos, type PhotoSource } from '@/entities/photo';

import { ShelfPhotoTile } from './shelf-photo-grid/shelf-photo-tile';
import { ShelfPlaceholderTiles } from './shelf-photo-grid/shelf-placeholder-tiles';

type ShelfPhotoGridProps = {
  source: PhotoSource;
  query: string;
  onPhotoPlaced: () => void;
  onDragActiveChange: (isDragging: boolean) => void;
};

// A plain scroller, not ScrollArea: its table-display wrapper lets CSS columns overflow.
export function ShelfPhotoGrid({
  source,
  query,
  onPhotoPlaced,
  onDragActiveChange,
}: ShelfPhotoGridProps) {
  const { data: shelf, isPending, isError } = useListPhotos({ source, query });

  return (
    <div className="flex min-h-0 flex-1 flex-col border-t border-brick-ink/12">
      <div className="min-h-0 flex-1 [scrollbar-width:thin] overflow-y-auto overscroll-contain px-4 py-3">
        {isPending && <ShelfPlaceholderTiles />}
        {isError && (
          <p className="py-10 text-center text-sm">The shelf is stuck. Give it a moment.</p>
        )}
        {shelf?.photos.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Nothing on the shelf for “{query}”. Try coffee, flowers or people.
          </p>
        )}
        {shelf && shelf.photos.length > 0 && (
          <ul className="columns-3 gap-2">
            {shelf.photos.map((photo) => (
              <li key={photo.id} className="mb-2 break-inside-avoid">
                <ShelfPhotoTile
                  photo={photo}
                  onPhotoPlaced={onPhotoPlaced}
                  onDragActiveChange={onDragActiveChange}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <footer className="flex items-center justify-between gap-3 border-t border-brick-ink/10 px-4 py-2 text-[11px] text-brick-ink/55">
        {shelf?.isPlaceholder ? (
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="size-1.5 rounded-full bg-mustard" />
            Placeholder library until the Stocksy API is connected
          </span>
        ) : (
          <span>Licensed through Stocksy</span>
        )}
        <span>Click to place · drag to position</span>
      </footer>
    </div>
  );
}
