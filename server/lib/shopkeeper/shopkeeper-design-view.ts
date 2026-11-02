import {
  canvasDesignSchema,
  type CanvasDesign,
  type CanvasElement,
  type ImageElement,
} from '../canvas-design/canvas-design-schema';
import type { LibraryPhoto } from '../photo-library/library-photo';
import { shopkeeperDesignSchema, type ShopkeeperDesign } from './shopkeeper-design-schema';

type ShopkeeperElement = ShopkeeperDesign['elements'][number];
type PhotoDetails = Pick<ImageElement, 'photoUrl' | 'photoTitle' | 'photoAspectRatio'>;

// Zod strips what the shopkeeper does not see: the design id and each photo's URL, title, ratio.
export function toShopkeeperDesign(design: CanvasDesign): ShopkeeperDesign {
  return shopkeeperDesignSchema.parse(design);
}

// Photos already on the paper first, so one that left the library still renders.
function collectPhotoDetails(currentDesign: CanvasDesign, libraryPhotos: readonly LibraryPhoto[]) {
  const detailsByPhotoId = new Map<string, PhotoDetails>();
  for (const element of currentDesign.elements) {
    if (element.kind !== 'image') continue;
    const { photoUrl, photoTitle, photoAspectRatio } = element;
    detailsByPhotoId.set(element.photoId, { photoUrl, photoTitle, photoAspectRatio });
  }
  for (const photo of libraryPhotos) {
    detailsByPhotoId.set(photo.id, {
      photoUrl: photo.imageUrl,
      photoTitle: photo.title,
      photoAspectRatio: photo.width / photo.height,
    });
  }
  return detailsByPhotoId;
}

function claimUniqueId(requestedId: string, claimedIds: Set<string>) {
  let uniqueId = requestedId;
  for (let suffix = 2; claimedIds.has(uniqueId); suffix += 1) uniqueId = `${requestedId}-${suffix}`;
  claimedIds.add(uniqueId);
  return uniqueId;
}

function toCanvasElement(
  element: ShopkeeperElement,
  detailsByPhotoId: ReadonlyMap<string, PhotoDetails>,
): CanvasElement | null {
  if (element.kind !== 'image') return element;
  const photoDetails = detailsByPhotoId.get(element.photoId);
  return photoDetails ? { ...element, ...photoDetails } : null;
}

// The shopkeeper's design as a full one: real photos only, unique ids, the current design id.
export function toCanvasDesign(
  shopkeeperDesign: ShopkeeperDesign,
  currentDesign: CanvasDesign,
  libraryPhotos: readonly LibraryPhoto[],
): CanvasDesign | null {
  const detailsByPhotoId = collectPhotoDetails(currentDesign, libraryPhotos);
  const claimedIds = new Set<string>();
  const elements = shopkeeperDesign.elements.flatMap((element) => {
    const canvasElement = toCanvasElement(element, detailsByPhotoId);
    if (!canvasElement) return [];
    return [{ ...canvasElement, id: claimUniqueId(canvasElement.id, claimedIds) }];
  });
  const design = canvasDesignSchema.safeParse({
    ...shopkeeperDesign,
    id: currentDesign.id,
    elements,
  });
  return design.success ? design.data : null;
}
