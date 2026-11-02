export const PRODUCT_IDS = ['mug', 't-shirt', 'greeting-card'] as const;
export type ProductId = (typeof PRODUCT_IDS)[number];

export type ProductColor = { id: string; name: string; hex: string };

export type PrintProduct = {
  id: ProductId;
  name: string;
  description: string;
  priceCents: number;
  printArea: { widthInches: number; heightInches: number };
  licenseLine: string;
  // What the colour choice paints, for example "Inside and handle".
  colorLabel: string;
  colors: readonly ProductColor[];
  // Empty when the product comes in one size.
  sizes: readonly string[];
  maxQuantity: number;
};

const DEMO_LICENSE_LINE = 'Products for Resale license — included in demo.';

export const PRINT_PRODUCTS: readonly PrintProduct[] = [
  {
    id: 'mug',
    name: 'Mug',
    description: '11 oz glazed ceramic mug, printed on the front.',
    priceCents: 1800,
    printArea: { widthInches: 3.25, heightInches: 3.5 },
    licenseLine: DEMO_LICENSE_LINE,
    colorLabel: 'Inside and handle',
    colors: [
      { id: 'white', name: 'White', hex: '#f3f0ea' },
      { id: 'deli-green', name: 'Deli green', hex: '#2e4b3f' },
      { id: 'brick-red', name: 'Brick red', hex: '#a64b32' },
      { id: 'mustard', name: 'Mustard', hex: '#e3a82b' },
      { id: 'ink', name: 'Ink black', hex: '#2a2320' },
    ],
    sizes: [],
    maxQuantity: 24,
  },
  {
    id: 't-shirt',
    name: 'T-shirt',
    description: 'Heavyweight cotton tee with a chest print.',
    priceCents: 2800,
    printArea: { widthInches: 12, heightInches: 16 },
    licenseLine: DEMO_LICENSE_LINE,
    colorLabel: 'Shirt colour',
    colors: [
      { id: 'white', name: 'White', hex: '#f5f3ee' },
      { id: 'natural', name: 'Natural', hex: '#e9dfcb' },
      { id: 'deli-green', name: 'Deli green', hex: '#2f4a3e' },
      { id: 'ink', name: 'Ink black', hex: '#2b2624' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    maxQuantity: 24,
  },
  {
    id: 'greeting-card',
    name: 'Greeting card',
    description: 'Folded 5 × 7 in card on uncoated stock, with an envelope.',
    priceCents: 650,
    printArea: { widthInches: 5, heightInches: 7 },
    licenseLine: DEMO_LICENSE_LINE,
    colorLabel: 'Paper',
    colors: [
      { id: 'natural', name: 'Natural', hex: '#f2eadb' },
      { id: 'bright-white', name: 'Bright white', hex: '#fbfaf7' },
    ],
    sizes: [],
    maxQuantity: 50,
  },
];

export function findPrintProduct(productId: ProductId) {
  const product = PRINT_PRODUCTS.find((candidate) => candidate.id === productId);
  if (!product) throw new Error(`Unknown print product: ${productId}`);
  return product;
}
