import { randomInt } from 'node:crypto';

import { findPrintProduct, type ProductId } from '../product-catalog/print-products';

// Letters and digits that cannot be misread for one another (no 0/O or 1/I).
const ORDER_CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export type DemoOrderRequest = {
  productId: ProductId;
  customerEmail: string;
};

export type DemoOrder = {
  orderNumber: string;
  productName: string;
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

// Charges nothing and stores nothing: a demo order exists only in this response.
export function placeDemoOrder(request: DemoOrderRequest): DemoOrder {
  const product = findPrintProduct(request.productId);
  return {
    orderNumber: `BTG-${createOrderCode(4)}-${createOrderCode(4)}`,
    productName: product.name,
    totalCents: product.priceCents,
    customerEmail: request.customerEmail,
    placedAt: new Date().toISOString(),
  };
}
