import { randomInt } from 'node:crypto';

import { findPrintProduct, type ProductId } from '../product-catalog/print-products';

// Letters and digits that cannot be misread for one another (no 0/O or 1/I).
const ORDER_CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export type DemoOrderRequest = {
  productId: ProductId;
  customerEmail: string;
  colorId: string;
  size: string | null;
  quantity: number;
};

export type DemoOrder = {
  orderNumber: string;
  productName: string;
  colorName: string;
  size: string | null;
  quantity: number;
  totalCents: number;
  customerEmail: string;
  placedAt: string;
};

function createOrderCode(length: number) {
  return Array.from(
    { length },
    () => ORDER_CODE_ALPHABET[randomInt(ORDER_CODE_ALPHABET.length)] ?? '',
  ).join('');
}

// True when the colour, size and quantity are ones the product actually comes in.
export function isOrderableChoice({ productId, colorId, size, quantity }: DemoOrderRequest) {
  const product = findPrintProduct(productId);
  const hasColor = product.colors.some((color) => color.id === colorId);
  const hasSize = product.sizes.length === 0 ? size === null : product.sizes.includes(size ?? '');
  return hasColor && hasSize && quantity <= product.maxQuantity;
}

// Charges nothing and stores nothing: a demo order exists only in this response.
export function placeDemoOrder(request: DemoOrderRequest): DemoOrder {
  const product = findPrintProduct(request.productId);
  const color = product.colors.find((candidate) => candidate.id === request.colorId);
  return {
    orderNumber: `BTG-${createOrderCode(4)}-${createOrderCode(4)}`,
    productName: product.name,
    colorName: color?.name ?? '',
    size: request.size,
    quantity: request.quantity,
    totalCents: product.priceCents * request.quantity,
    customerEmail: request.customerEmail,
    placedAt: new Date().toISOString(),
  };
}
