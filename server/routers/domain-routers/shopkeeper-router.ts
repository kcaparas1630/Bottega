import { z } from 'zod';

import { canvasDesignSchema } from '../../lib/canvas-design/canvas-design-schema';
import { askShopkeeper } from '../../lib/shopkeeper/ask-shopkeeper';
import { readConversation } from '../../lib/shopkeeper/conversation-store';
import { createRouter, publicProcedure } from '../../lib/trpc/trpc-init';

const shopkeeperQuestionSchema = z.object({
  message: z.string().trim().min(1).max(500),
  design: canvasDesignSchema,
});

export const shopkeeperRouter = createRouter({
  conversation: publicProcedure
    .input(z.object({ designId: z.string().min(1).max(64) }))
    .query(({ input }) => readConversation(input.designId).transcript),
  ask: publicProcedure
    .input(shopkeeperQuestionSchema)
    .mutation(({ input }) => askShopkeeper(input)),
});
