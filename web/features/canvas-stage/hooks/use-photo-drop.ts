import type { DragEvent } from 'react';

import { useCanvasStore } from '@/entities/canvas';
import { isDraggingPhoto, readPhotoFromDrop } from '@/entities/photo';

// Lets shelf photos be dropped onto the paper exactly where the pointer lets go.
export function usePhotoDrop(scale: number) {
  const addPhoto = useCanvasStore((state) => state.addPhoto);
  return {
    onDragOver(event: DragEvent<HTMLElement>) {
      if (!isDraggingPhoto(event.dataTransfer)) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
    },
    onDrop(event: DragEvent<HTMLElement>) {
      const photo = readPhotoFromDrop(event.dataTransfer);
      if (!photo || scale <= 0) return;
      event.preventDefault();
      const paperBounds = event.currentTarget.getBoundingClientRect();
      addPhoto(photo, {
        x: (event.clientX - paperBounds.left) / scale,
        y: (event.clientY - paperBounds.top) / scale,
      });
    },
  };
}
