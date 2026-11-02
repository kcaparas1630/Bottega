'use client';

import { useDeferredValue, useState } from 'react';

import type { PhotoSource } from '@/entities/photo';
import { SegmentedControl } from '@/shared/ui/segmented-control';

import { ShelfPhotoGrid } from './photo-shelf/shelf-photo-grid';
import { ShelfSearch } from './photo-shelf/shelf-search';

type PhotoShelfProps = {
  // Called once a photo is on the paper, by click or by drop, so the host can close.
  onPhotoPlaced: () => void;
  // True while a photo is being dragged, so the host can step out of the way.
  onDragActiveChange: (isDragging: boolean) => void;
};

const SOURCE_OPTIONS = [
  { value: 'stocksy', label: 'Stocksy' },
  { value: 'owned', label: 'Your photos' },
] as const;

// The shelf: licensed Stocksy imports and the customer's own photos, searchable by topic.
export function PhotoShelf({ onPhotoPlaced, onDragActiveChange }: PhotoShelfProps) {
  const [source, setSource] = useState<PhotoSource>('stocksy');
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  return (
    <section aria-label="Photos" className="flex h-full min-h-0 flex-col">
      <header className="flex items-center justify-between gap-4 px-4 pt-3">
        <h2 className="label-caps font-sans tracking-[0.08em] text-brick-ink/60">Photos</h2>
        <SegmentedControl
          ariaLabel="Photo source"
          value={source}
          options={SOURCE_OPTIONS}
          onChange={setSource}
          className="w-48"
        />
      </header>
      <ShelfSearch query={query} onQueryChange={setQuery} />
      <ShelfPhotoGrid
        source={source}
        query={deferredQuery}
        onPhotoPlaced={onPhotoPlaced}
        onDragActiveChange={onDragActiveChange}
      />
    </section>
  );
}
