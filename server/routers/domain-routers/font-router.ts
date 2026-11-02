import { z } from 'zod';

import { FONT_CATEGORIES, searchFonts } from '../../lib/font-catalog/font-catalog';
import { createRouter, publicProcedure } from '../../lib/trpc/trpc-init';

export const fontRouter = createRouter({
  list: publicProcedure
    .input(
      z.object({
        query: z.string().trim().max(60).default(''),
        category: z.enum(FONT_CATEGORIES).optional(),
        limit: z.number().int().min(1).max(200).default(40),
      }),
    )
    .query(({ input }) => searchFonts(input)),
});
