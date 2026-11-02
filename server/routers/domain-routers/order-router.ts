import { z } from 'zod';

import { isOrderableChoice, placeDemoOrder } from '../../lib/demo-orders/place-demo-order';
import { PRODUCT_IDS } from '../../lib/product-catalog/print-products';
import { createRouter, publicProcedure } from '../../lib/trpc/trpc-init';

const demoOrderInput = z
  .object({
    productId: z.enum(PRODUCT_IDS),
    customerEmail: z.email(),
    colorId: z.string(),
    size: z.string().nullable(),
    quantity: z.int().min(1),
  })
  .refine(isOrderableChoice, { message: 'That colour, size or quantity is not available.' });

export const orderRouter = createRouter({
  placeDemo: publicProcedure.input(demoOrderInput).mutation(({ input }) => placeDemoOrder(input)),
});
