import { createRouter } from '../lib/trpc/trpc-init';
import { canvasRouter } from './domain-routers/canvas-router';
import { fontRouter } from './domain-routers/font-router';
import { orderRouter } from './domain-routers/order-router';
import { photoRouter } from './domain-routers/photo-router';
import { productRouter } from './domain-routers/product-router';
import { shopkeeperRouter } from './domain-routers/shopkeeper-router';

export const appRouter = createRouter({
  canvas: canvasRouter,
  photo: photoRouter,
  font: fontRouter,
  product: productRouter,
  order: orderRouter,
  shopkeeper: shopkeeperRouter,
});

export type AppRouter = typeof appRouter;
