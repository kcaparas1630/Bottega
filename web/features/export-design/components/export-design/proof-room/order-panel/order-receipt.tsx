import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { DemoOrder } from '@/entities/order';

import { describeChoice } from '../../../../lib/describe-choice';
import { NextSteps } from './order-receipt/next-steps';
import { OrderLines } from './shared/order-lines';

type OrderReceiptProps = {
  placedOrder: DemoOrder;
  onBackToCanvas: () => void;
  onStartOver: () => void;
};

// The receipt: thanks, the order number on a green plate, what was ordered, and what would happen next.
export function OrderReceipt({ placedOrder, onBackToCanvas, onStartOver }: OrderReceiptProps) {
  return (
    <div className="flex flex-1 animate-paper-settle flex-col gap-5 p-6">
      <div className="flex flex-col gap-2">
        <h3 className="flex items-center gap-3 text-[30px] leading-tight">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-shop-green text-mortar-cream">
            <Check className="size-[18px]" aria-hidden />
          </span>
          Your order is in.
        </h3>
        <p className="text-sm text-muted-foreground">
          Thank you. As far as a demo goes, nothing was charged and nothing ships; the receipt would
          go to {placedOrder.customerEmail}.
        </p>
      </div>
      <p className="flex items-center justify-between rounded-md bg-shop-green px-4 py-3 text-mortar-cream">
        <span className="label-caps tracking-[0.16em] text-mustard">Order</span>
        <span className="font-medium tracking-wide tabular-nums">{placedOrder.orderNumber}</span>
      </p>
      <OrderLines
        productName={placedOrder.productName}
        details={describeChoice(placedOrder.colorName, placedOrder.size)}
        quantity={placedOrder.quantity}
        totalCents={placedOrder.totalCents}
      />
      <NextSteps />
      <div className="mt-auto grid grid-cols-2 gap-2">
        <Button variant="outline" size="lg" className="h-12" onClick={onStartOver}>
          Print another
        </Button>
        <Button size="lg" className="h-12 text-[15px]" onClick={onBackToCanvas}>
          Back to canvas
        </Button>
      </div>
    </div>
  );
}
