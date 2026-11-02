import { z } from 'zod';

import { activePhotoLibrary } from '../../lib/photo-library/active-photo-library';
import { PHOTO_SOURCES } from '../../lib/photo-library/library-photo';
import { createRouter, publicProcedure } from '../../lib/trpc/trpc-init';

export const photoRouter = createRouter({
  list: publicProcedure
    .input(z.object({ source: z.enum(PHOTO_SOURCES), query: z.string().trim().max(80).optional() }))
    .query(async ({ input }) => ({
      photos: await activePhotoLibrary.listPhotos(input.source, input.query),
      isPlaceholder: activePhotoLibrary.isPlaceholder,
    })),
});
