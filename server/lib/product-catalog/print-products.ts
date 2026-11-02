export const PRODUCT_IDS = ['mug', 't-shirt', 'greeting-card'] as const;
export type ProductId = (typeof PRODUCT_IDS)[number];

export type PrintProduct = {
  id: ProductId;
  name: string;
  description: string;
  priceCents: number;
  printArea: { widthInches: number; heightInches: number };
  licenseLine: string;
};

const DEMO_LICENSE_LINE = 'Products for Resale license — included in demo.';

export const PRINT_PRODUCTS: readonly PrintProduct[] = [
  {
    id: 'mug',
    name: 'Mug',
    description: '11 oz ceramic mug, printed on the front.',
    priceCents: 1800,
    printArea: { widthInches: 3.25, heightInches: 3.5 },
    licenseLine: DEMO_LICENSE_LINE,
  },
  {
    id: 't-shirt',
    name: 'T-shirt',
    description: 'Heavyweight cotton tee with a chest print.',
    priceCents: 2800,
    printArea: { widthInches: 12, heightInches: 16 },
    licenseLine: DEMO_LICENSE_LINE,
  },
  {
    id: 'greeting-card',
    name: 'Greeting card',
    description: 'Folded 5 × 7 in card on uncoated stock.',
    priceCents: 650,
    printArea: { widthInches: 5, heightInches: 7 },
    licenseLine: DEMO_LICENSE_LINE,
  },
];

export function findPrintProduct(productId: ProductId) {
  const product = PRINT_PRODUCTS.find((candidate) => candidate.id === productId);
  if (!product) throw new Error(`Unknown print product: ${productId}`);
  return product;
}
