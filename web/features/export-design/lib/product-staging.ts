import type { ProductId } from '@/entities/product';

// Products stand on this floor, in scene units, so the camera frames each one the same way.
export const FLOOR_Y = -1.75;

type ProductStaging = {
  // Where the product faces at rest, in radians; the mug shows its handle, the card its opening.
  restAngle: number;
  // How far the viewer may turn it either way; the shirt is one printed panel, so it turns a little.
  turnLimit: number;
  // Width of the soft shadow under it; zero when it hangs rather than stands.
  shadowWidth: number;
};

export const PRODUCT_STAGING: Record<ProductId, ProductStaging> = {
  mug: { restAngle: -0.3, turnLimit: Number.POSITIVE_INFINITY, shadowWidth: 4.4 },
  't-shirt': { restAngle: 0, turnLimit: 0.55, shadowWidth: 0 },
  'greeting-card': { restAngle: -0.3, turnLimit: Number.POSITIVE_INFINITY, shadowWidth: 4.6 },
};
