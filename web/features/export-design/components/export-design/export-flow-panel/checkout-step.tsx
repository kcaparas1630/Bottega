import { Lock } from 'lucide-react';
import { useId, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { PrintProduct } from '@/entities/product';

import { formatPrice } from '../../../lib/format-price';
import { DemoCardFields } from './checkout-step/demo-card-fields';
import { OrderSummary } from './checkout-step/order-summary';

type CheckoutStepProps = {
  product: PrintProduct;
  isPlacingOrder: boolean;
  didOrderFail: boolean;
  onPlaceOrder: (customerEmail: string) => void;
  onBack: () => void;
};

export function CheckoutStep({
  product,
  isPlacingOrder,
  didOrderFail,
  onPlaceOrder,
  onBack,
}: CheckoutStepProps) {
  const emailId = useId();
  const cardholderId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const customerEmail = new FormData(event.currentTarget).get('email');
    if (typeof customerEmail === 'string') onPlaceOrder(customerEmail);
  }

  return (
    <section className="grid animate-paper-settle gap-6 md:grid-cols-[16rem_1fr]">
      <OrderSummary product={product} onBack={onBack} />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <p className="rounded-hand-sm border border-mustard/70 bg-mustard/20 px-3 py-2 text-sm font-medium">
          Demo checkout — no charge, nothing ships.
        </p>
        <div className="grid gap-1.5">
          <Label htmlFor={emailId}>Email</Label>
          <Input id={emailId} name="email" type="email" required placeholder="you@example.com" />
        </div>
        <DemoCardFields />
        <div className="grid gap-1.5">
          <Label htmlFor={cardholderId}>Name on card</Label>
          <Input id={cardholderId} required autoComplete="off" placeholder="Your name" />
        </div>
        {didOrderFail && (
          <p role="alert" className="text-sm text-brick-red">
            That didn&apos;t go through. Check the email and try again.
          </p>
        )}
        <Button type="submit" size="lg" disabled={isPlacingOrder}>
          <Lock />
          {isPlacingOrder ? 'Placing your order…' : `Pay ${formatPrice(product.priceCents)}`}
        </Button>
        <p className="text-center text-[13px] text-muted-foreground">
          Card details never leave this page. The test card is already filled in.
        </p>
      </form>
    </section>
  );
}
