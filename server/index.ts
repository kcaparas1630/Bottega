import 'server-only';

export { appRouter, type AppRouter } from './routers/app-router';
export type {
  CanvasDesign,
  CanvasElement,
  ImageCrop,
  ImageElement,
  ImageFilter,
  ShapeElement,
  ShapeKind,
  TextAlign,
  TextElement,
} from './lib/canvas-design/canvas-design-schema';
export type { DemoOrder } from './lib/demo-orders/place-demo-order';
export type { CatalogFont, FontCategory } from './lib/font-catalog/font-catalog';
export type { LibraryPhoto, PhotoSource } from './lib/photo-library/library-photo';
export type { PrintProduct, ProductColor, ProductId } from './lib/product-catalog/print-products';
export type {
  ShopkeeperReply,
  ShopkeeperTranscriptEntry,
} from './lib/shopkeeper/shopkeeper-conversation';
