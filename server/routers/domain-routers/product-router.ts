import { PRINT_PRODUCTS } from '../../lib/product-catalog/print-products';
import { createRouter, publicProcedure } from '../../lib/trpc/trpc-init';

export const productRouter = createRouter({
  list: publicProcedure.query(() => PRINT_PRODUCTS),
});
