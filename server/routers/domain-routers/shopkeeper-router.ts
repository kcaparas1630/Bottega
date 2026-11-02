import { z } from 'zod';

import { activePhotoLibrary } from '../../lib/photo-library/active-photo-library';
import { answerAsShopkeeper } from '../../lib/shopkeeper/placeholder-shopkeeper';
import { createRouter, publicProcedure } from '../../lib/trpc/trpc-init';

const shopkeeperQuestionSchema = z.object({
  message: z.string().trim().min(1).max(500),
  canvasSummary: z.object({
    imageCount: z.number().int().nonnegative(),
    textCount: z.number().int().nonnegative(),
  }),
});

export const shopkeeperRouter = createRouter({
  ask: publicProcedure.input(shopkeeperQuestionSchema).mutation(async ({ input }) => {
    const shelfPhotos = await activePhotoLibrary.listPhotos('stocksy');
    return answerAsShopkeeper(input, shelfPhotos);
  }),
});
