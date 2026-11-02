import type { LibraryPhoto } from '@bottega/server';

const PHOTO_DRAG_MIME_TYPE = 'application/x-bottega-photo';

export function writePhotoToDrag(dataTransfer: DataTransfer, photo: LibraryPhoto) {
  dataTransfer.setData(PHOTO_DRAG_MIME_TYPE, JSON.stringify(photo));
  dataTransfer.effectAllowed = 'copy';
}

// Browsers hide drag contents until drop, so dragover can only check the type.
export function isDraggingPhoto(dataTransfer: DataTransfer) {
  return dataTransfer.types.includes(PHOTO_DRAG_MIME_TYPE);
}

export function readPhotoFromDrop(dataTransfer: DataTransfer) {
  const serializedPhoto = dataTransfer.getData(PHOTO_DRAG_MIME_TYPE);
  if (!serializedPhoto) return null;
  try {
    return JSON.parse(serializedPhoto) as LibraryPhoto;
  } catch {
    return null;
  }
}
