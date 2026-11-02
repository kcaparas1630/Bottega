import type { LibraryPhoto } from '../photo-library/library-photo';
import { findMatchingPhotos } from './find-matching-photos';
import type { ShopkeeperQuestion, ShopkeeperReply } from './shopkeeper-conversation';
import {
  FALLBACK_REPLY,
  GREETING_REPLY,
  TYPE_REPLY,
  adviseOnLayout,
  describeMatchingPhotos,
} from './shopkeeper-replies';

const GREETING_PATTERN = /\b(hi|hello|hey|morning|afternoon|evening)\b/i;
const LAYOUT_PATTERN =
  /\b(layout|arrange|place|position|align|centre|center|compose|space|crop)\b/i;
const TYPE_PATTERN = /\b(text|font|type|headline|title|words|caption)\b/i;
const HOUSE_FAVOURITE_COUNT = 3;

function pickHouseFavourites(shelfPhotos: readonly LibraryPhoto[]) {
  return shelfPhotos.filter((photo) => photo.tags.includes('warm')).slice(0, HOUSE_FAVOURITE_COUNT);
}

// Rule-based stand-in for the AI assistant; see docs/adr/008 for the swap plan.
export function answerAsShopkeeper(
  question: ShopkeeperQuestion,
  shelfPhotos: readonly LibraryPhoto[],
): ShopkeeperReply {
  const { message, canvasSummary } = question;
  const matchingPhotos = findMatchingPhotos(message, shelfPhotos);
  if (matchingPhotos.length > 0) {
    return { reply: describeMatchingPhotos(matchingPhotos), suggestions: matchingPhotos };
  }
  if (LAYOUT_PATTERN.test(message))
    return { reply: adviseOnLayout(canvasSummary), suggestions: [] };
  if (TYPE_PATTERN.test(message)) return { reply: TYPE_REPLY, suggestions: [] };
  const reply = GREETING_PATTERN.test(message) ? GREETING_REPLY : FALLBACK_REPLY;
  return { reply, suggestions: pickHouseFavourites(shelfPhotos) };
}
