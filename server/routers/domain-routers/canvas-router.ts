import { z } from 'zod';

import { canvasDesignSchema } from '../../lib/canvas-design/canvas-design-schema';
import { findDesign, saveDesign } from '../../lib/canvas-design/design-repository';
import { createRouter, publicProcedure } from '../../lib/trpc/trpc-init';

export const canvasRouter = createRouter({
  get: publicProcedure
    .input(z.object({ designId: z.string().min(1).max(64) }))
    .query(({ input }) => findDesign(input.designId)),
  save: publicProcedure.input(canvasDesignSchema).mutation(({ input }) => saveDesign(input)),
});
