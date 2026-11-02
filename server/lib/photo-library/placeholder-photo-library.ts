import { z } from 'zod';

import { PHOTO_SOURCES, type LibraryPhoto, type PhotoLibrary } from './library-photo';
import placeholderPhotoRecords from './placeholder-photos.json';
import { searchPhotos } from './search-photos';

const THUMBNAIL_WIDTH = 480;
const FULL_IMAGE_WIDTH = 1600;

const placeholderPhotoRecordSchema = z.object({
  picsumId: z.number().int().nonnegative(),
  source: z.enum(PHOTO_SOURCES),
  title: z.string(),
  photographer: z.string(),
  width: z.number().positive(),
  height: z.number().positive(),
  tags: z.array(z.string()),
});
type PlaceholderPhotoRecord = z.infer<typeof placeholderPhotoRecordSchema>;

// Picsum crops to the exact size asked for, so the height keeps the original aspect ratio.
function buildPicsumUrl(record: PlaceholderPhotoRecord, targetWidth: number) {
  const targetHeight = Math.round((targetWidth * record.height) / record.width);
  return `https://picsum.photos/id/${record.picsumId}/${targetWidth}/${targetHeight}`;
}

function toLibraryPhoto(record: PlaceholderPhotoRecord): LibraryPhoto {
  return {
    id: `placeholder-${record.picsumId}`,
    source: record.source,
    title: record.title,
    photographer: record.photographer,
    width: record.width,
    height: record.height,
    thumbnailUrl: buildPicsumUrl(record, THUMBNAIL_WIDTH),
    imageUrl: buildPicsumUrl(record, FULL_IMAGE_WIDTH),
    tags: record.tags,
  };
}

const PLACEHOLDER_PHOTOS = placeholderPhotoRecordSchema
  .array()
  .parse(placeholderPhotoRecords)
  .map(toLibraryPhoto);

// Stand-in for the Stocksy API until it is approved; see docs/adr/007.
export const placeholderPhotoLibrary: PhotoLibrary = {
  isPlaceholder: true,
  listPhotos: (source, query = '') =>
    Promise.resolve(
      searchPhotos(
        PLACEHOLDER_PHOTOS.filter((photo) => photo.source === source),
        query,
      ),
    ),
};
