import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { DemoOrder } from '@/entities/order';
import { PaperTag } from '@/shared/ui/paper-tag';

import { formatPrice } from '../../../lib/format-price';

type SuccessStepProps = {
  placedOrder: DemoOrder;
  onBackToCanvas: () => void;
  onStartOver: () => void;
};

export function SuccessStep({ placedOrder, onBackToCanvas, onStartOver }: SuccessStepProps) {
  return (
    <section className="flex animate-paper-settle flex-col items-center gap-4 py-8 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-shop-green text-mortar-cream">
        <Check className="size-7" aria-hidden />
      </span>
      <h3 className="text-3xl">Wrapped and on the counter.</h3>
      <p className="max-w-sm text-sm text-muted-foreground">
        Your {placedOrder.productName.toLowerCase()} order is placed, as far as a demo goes. Nothing
        was charged and nothing ships.
      </p>
      <PaperTag tone="mustard" className="text-sm">
        Order {placedOrder.orderNumber}
      </PaperTag>
      <p className="text-[13px] text-muted-foreground">
        Total {formatPrice(placedOrder.totalCents)} · for {placedOrder.customerEmail}
      </p>
      <div className="mt-2 flex gap-2">
        <Button onClick={onBackToCanvas}>Back to canvas</Button>
        <Button variant="outline" onClick={onStartOver}>
          Print something else
        </Button>
      </div>
    </section>
  );
}
