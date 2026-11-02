import { z } from 'zod';

import { placeDemoOrder } from '../../lib/demo-orders/place-demo-order';
import { PRODUCT_IDS } from '../../lib/product-catalog/print-products';
import { createRouter, publicProcedure } from '../../lib/trpc/trpc-init';

export const orderRouter = createRouter({
  placeDemo: publicProcedure
    .input(z.object({ productId: z.enum(PRODUCT_IDS), customerEmail: z.email() }))
    .mutation(({ input }) => placeDemoOrder(input)),
});
