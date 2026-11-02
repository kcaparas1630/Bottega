import { ArrowLeft, Lock } from 'lucide-react';
import { useId, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { ProductChoice } from '../../../../hooks/use-product-choice';
import { describeChoice } from '../../../../lib/describe-choice';
import { formatPrice } from '../../../../lib/format-price';
import { DemoCardFields } from './checkout-form/demo-card-fields';
import { OrderLines } from './shared/order-lines';

type CheckoutFormProps = {
  choice: ProductChoice;
  isPlacingOrder: boolean;
  didOrderFail: boolean;
  onPlaceOrder: (customerEmail: string) => void;
  onBack: () => void;
};

// The demo checkout: the order at a glance, an email, a pre-filled test card, and Pay.
export function CheckoutForm({
  choice,
  isPlacingOrder,
  didOrderFail,
  onPlaceOrder,
  onBack,
}: CheckoutFormProps) {
  const emailId = useId();
  const cardholderId = useId();
  const { product, color, size, quantity } = choice;
  if (!product || !color) return null;
  const totalCents = product.priceCents * quantity;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const customerEmail = new FormData(event.currentTarget).get('email');
    if (typeof customerEmail === 'string') onPlaceOrder(customerEmail);
  }

  return (
    <form className="flex flex-1 animate-paper-settle flex-col gap-5 p-6" onSubmit={handleSubmit}>
      <Button type="button" variant="link" size="sm" className="self-start px-0" onClick={onBack}>
        <ArrowLeft />
        Back to the proof
      </Button>
      <OrderLines
        productName={product.name}
        details={describeChoice(color.name, size)}
        quantity={quantity}
        totalCents={totalCents}
      />
      <p className="rounded-md border border-mustard/70 bg-mustard/15 px-3 py-2 text-[13px] font-medium">
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
      <Button
        type="submit"
        size="lg"
        className="mt-auto h-12 text-[15px]"
        disabled={isPlacingOrder}
      >
        <Lock />
        {isPlacingOrder ? 'Placing your order…' : `Pay ${formatPrice(totalCents)}`}
      </Button>
      <p className="-mt-2 text-center text-xs text-muted-foreground">
        Card details never leave this page. The test card is already filled in.
      </p>
    </form>
  );
}
