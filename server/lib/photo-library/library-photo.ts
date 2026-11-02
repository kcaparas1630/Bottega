export const PHOTO_SOURCES = ['stocksy', 'owned'] as const;
export type PhotoSource = (typeof PHOTO_SOURCES)[number];

export type LibraryPhoto = {
  id: string;
  source: PhotoSource;
  title: string;
  photographer: string;
  width: number;
  height: number;
  thumbnailUrl: string;
  imageUrl: string;
  tags: string[];
};

// Any photo backend (placeholder today, Stocksy later) implements this contract.
export type PhotoLibrary = {
  isPlaceholder: boolean;
  // An empty or missing query lists the whole source.
  listPhotos: (source: PhotoSource, query?: string) => Promise<LibraryPhoto[]>;
};
