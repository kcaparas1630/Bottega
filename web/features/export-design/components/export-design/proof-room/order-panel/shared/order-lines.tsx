import { formatPrice } from '../../../../../lib/format-price';

type OrderLinesProps = {
  productName: string;
  details: string;
  quantity: number;
  totalCents: number;
};

// The order at a glance: what, in which options, how many, and the total.
export function OrderLines({ productName, details, quantity, totalCents }: OrderLinesProps) {
  return (
    <div className="rounded-lg border border-brick-ink/12 bg-white/45 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-serif-display text-lg leading-tight">{productName}</p>
          <p className="text-[13px] text-muted-foreground">{details}</p>
        </div>
        <p className="text-sm text-muted-foreground tabular-nums">× {quantity}</p>
      </div>
      <dl className="mt-3 grid grid-cols-[1fr_auto] gap-y-1 border-t border-brick-ink/10 pt-3 text-sm">
        <dt>Shipping</dt>
        <dd>Free (demo)</dd>
        <dt className="font-semibold">Total</dt>
        <dd className="font-semibold tabular-nums">{formatPrice(totalCents)}</dd>
      </dl>
    </div>
  );
}
