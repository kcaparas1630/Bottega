import type { LibraryPhoto } from '../photo-library/library-photo';

const MAX_SUGGESTIONS = 4;
const IGNORED_WORDS = new Set([
  'the',
  'and',
  'for',
  'with',
  'something',
  'some',
  'please',
  'can',
  'you',
  'show',
  'find',
  'want',
  'need',
  'looking',
  'like',
  'photo',
  'picture',
  'image',
  'have',
  'got',
  'any',
]);

// Lowercases and drops a plural "s" so "mugs" matches the tag "mug".
function toWordStem(word: string) {
  const lowercaseWord = word.toLowerCase();
  return lowercaseWord.length > 3 && lowercaseWord.endsWith('s')
    ? lowercaseWord.slice(0, -1)
    : lowercaseWord;
}

function extractKeywords(message: string) {
  const words = message.toLowerCase().match(/[a-z]+/g) ?? [];
  return words.filter((word) => word.length > 2 && !IGNORED_WORDS.has(word)).map(toWordStem);
}

function scorePhoto(photo: LibraryPhoto, keywords: readonly string[]) {
  const photoWords = new Set([...photo.tags, ...photo.title.split(/\s+/)].map(toWordStem));
  return keywords.filter((keyword) => photoWords.has(keyword)).length;
}

// Ranks shelf photos by how many of the customer's words match their tags and title.
export function findMatchingPhotos(message: string, shelfPhotos: readonly LibraryPhoto[]) {
  const keywords = extractKeywords(message);
  if (keywords.length === 0) return [];
  return shelfPhotos
    .map((photo) => ({ photo, score: scorePhoto(photo, keywords) }))
    .filter(({ score }) => score > 0)
    .sort((first, second) => second.score - first.score)
    .slice(0, MAX_SUGGESTIONS)
    .map(({ photo }) => photo);
}
