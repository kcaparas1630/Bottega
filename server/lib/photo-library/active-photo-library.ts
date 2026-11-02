import type { PhotoLibrary } from './library-photo';
import { placeholderPhotoLibrary } from './placeholder-photo-library';

// The single swap point: replace with the Stocksy-backed library once the API is approved.
export const activePhotoLibrary: PhotoLibrary = placeholderPhotoLibrary;
