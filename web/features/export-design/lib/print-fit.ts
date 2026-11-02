import type { PrintProduct } from '@/entities/product';

export type PrintFit = { trimmedPercent: number; trimmedEdges: 'sides' | 'top and bottom' };

export function printAspectOf(product: PrintProduct) {
  return product.printArea.widthInches / product.printArea.heightInches;
}

// How much of the design the print area trims when the design covers it edge to edge.
export function measurePrintFit(designAspect: number, product: PrintProduct): PrintFit {
  const printAspect = printAspectOf(product);
  const isDesignWider = designAspect > printAspect;
  const keptFraction = isDesignWider ? printAspect / designAspect : designAspect / printAspect;
  return {
    trimmedPercent: Math.round((1 - keptFraction) * 100),
    trimmedEdges: isDesignWider ? 'sides' : 'top and bottom',
  };
}

// The product that trims the least of the design, so the proof opens on the best match.
export function findBestFitProduct(products: readonly PrintProduct[], designAspect: number) {
  return products.reduce<PrintProduct | null>((bestProduct, product) => {
    if (!bestProduct) return product;
    const trimmed = measurePrintFit(designAspect, product).trimmedPercent;
    return trimmed < measurePrintFit(designAspect, bestProduct).trimmedPercent
      ? product
      : bestProduct;
  }, null);
}
