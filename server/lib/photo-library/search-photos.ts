import type { LibraryPhoto } from './library-photo';

function toSearchWords(text: string) {
  return text.toLowerCase().match(/[a-z0-9]+/g) ?? [];
}

// Keeps photos where every typed word starts a word in the title, tags or photographer.
export function searchPhotos(photos: readonly LibraryPhoto[], query: string) {
  const queryWords = toSearchWords(query);
  if (queryWords.length === 0) return [...photos];
  return photos.filter((photo) => {
    const photoWords = toSearchWords([photo.title, photo.photographer, ...photo.tags].join(' '));
    return queryWords.every((queryWord) =>
      photoWords.some((photoWord) => photoWord.startsWith(queryWord)),
    );
  });
}
