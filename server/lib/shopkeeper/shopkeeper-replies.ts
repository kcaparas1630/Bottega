import type { LibraryPhoto } from '../photo-library/library-photo';
import type { CanvasSummary } from './shopkeeper-conversation';

export const GREETING_REPLY =
  "Hello to you too! Give me a mood or a subject (coffee, flowers, the sea) and I'll pull a few photos off the shelf.";

export const TYPE_REPLY =
  'Fraunces for the headline, the sans for anything small. Keep it to a few words: big, warm and a little loose.';

export const FALLBACK_REPLY =
  "I don't have that one on the shelf, but here are a few house favourites. Try a mood or a subject: coffee, flowers, mountains, the sea.";

export function describeMatchingPhotos(matchingPhotos: readonly LibraryPhoto[]) {
  const [firstMatch] = matchingPhotos;
  if (!firstMatch) return FALLBACK_REPLY;
  const countPhrase = matchingPhotos.length === 1 ? 'one' : String(matchingPhotos.length);
  return `I've got ${countPhrase} on the shelf that might suit. "${firstMatch.title}" by ${firstMatch.photographer} is a lovely place to start. Tap one to set it on your paper.`;
}

export function adviseOnLayout({ imageCount, textCount }: CanvasSummary) {
  if (imageCount === 0) {
    return 'Start with one strong photo and let it take most of the paper. Everything else is easier once it is down.';
  }
  if (imageCount > 2) {
    return `That's ${imageCount} photos. I'd let one lead and keep the others smaller, lined up along a shared edge.`;
  }
  if (textCount === 0) {
    return 'Nice photo. Give it one short line of type underneath and leave a generous margin; breathing room reads as care.';
  }
  return 'Line up the left edges of your photo and your words, and keep anything important away from the paper edge so it survives the print.';
}
