import { CreditCard } from 'lucide-react';

import { Input } from '@/components/ui/input';

const FIELD_CLASS =
  'h-auto rounded-none border-0 bg-transparent px-3 py-2.5 shadow-none focus-visible:ring-0 md:text-sm';

// Stripe-style card fields, pre-filled with a test card and never submitted anywhere.
export function DemoCardFields() {
  return (
    <fieldset className="grid gap-1.5">
      <legend className="mb-1.5 text-sm font-medium">Card information</legend>
      <div className="overflow-hidden rounded-hand-sm border border-input bg-card shadow-xs focus-within:ring-[3px] focus-within:ring-ring/50">
        <div className="relative">
          <Input
            aria-label="Card number"
            inputMode="numeric"
            autoComplete="off"
            required
            pattern="[0-9 ]{12,23}"
            defaultValue="4242 4242 4242 4242"
            className={FIELD_CLASS}
          />
          <CreditCard
            aria-hidden
            className="absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
          />
        </div>
        <div className="grid grid-cols-2 border-t border-input">
          <Input
            aria-label="Expiry date, month and year"
            autoComplete="off"
            required
            placeholder="MM / YY"
            pattern="[0-9]{2} ?/ ?[0-9]{2}"
            defaultValue="12 / 34"
            className={`${FIELD_CLASS} border-r border-input`}
          />
          <Input
            aria-label="Security code"
            inputMode="numeric"
            autoComplete="off"
            required
            placeholder="CVC"
            pattern="[0-9]{3,4}"
            defaultValue="123"
            className={FIELD_CLASS}
          />
        </div>
      </div>
    </fieldset>
  );
}
