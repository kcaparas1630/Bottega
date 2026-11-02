import { CircleCheck, Crop } from 'lucide-react';

import type { PrintProduct } from '@/entities/product';

import { measurePrintFit } from '../../../../../lib/print-fit';

// Below this the trim is a sliver nobody would notice, so the design counts as a full fit.
const UNNOTICEABLE_TRIM_PERCENT = 2;

type PrintFitNoteProps = {
  product: PrintProduct;
  designAspect: number;
};

// Says how the design meets the print area, and how much of it the print trims when the shapes differ.
export function PrintFitNote({ product, designAspect }: PrintFitNoteProps) {
  const { trimmedPercent, trimmedEdges } = measurePrintFit(designAspect, product);
  const { widthInches, heightInches } = product.printArea;
  const isFullFit = trimmedPercent < UNNOTICEABLE_TRIM_PERCENT;
  return (
    <p className="flex gap-2.5 rounded-md bg-warm-sand/60 px-3.5 py-3 text-[13px] leading-snug">
      {isFullFit ? (
        <CircleCheck className="mt-px size-4 shrink-0 text-shop-green" aria-hidden />
      ) : (
        <Crop className="mt-px size-4 shrink-0 text-brick-red" aria-hidden />
      )}
      <span>
        <span className="font-medium">
          Print area {widthInches} × {heightInches} in.
        </span>{' '}
        {isFullFit
          ? 'Your design fills it edge to edge.'
          : `The print trims about ${trimmedPercent}% from the ${trimmedEdges} of your design.`}
      </span>
    </p>
  );
}
