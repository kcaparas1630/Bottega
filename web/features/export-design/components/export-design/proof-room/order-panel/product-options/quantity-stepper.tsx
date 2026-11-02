import { Minus, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { OptionLabel } from '../shared/option-label';

type QuantityStepperProps = {
  value: number;
  max: number;
  onChange: (quantity: number) => void;
};

// How many to print, one more or one fewer at a time, from one up to the product's limit.
export function QuantityStepper({ value, max, onChange }: QuantityStepperProps) {
  return (
    <div className="grid gap-2.5">
      <OptionLabel label="Quantity" />
      <div
        role="group"
        aria-label="Quantity"
        className="flex h-10 w-fit items-center rounded-md border border-brick-ink/25 bg-white/50"
      >
        <Button
          variant="ghost"
          size="icon"
          aria-label="One fewer"
          disabled={value <= 1}
          onClick={() => onChange(value - 1)}
        >
          <Minus />
        </Button>
        <output aria-live="polite" className="w-10 text-center text-sm font-medium tabular-nums">
          {value}
        </output>
        <Button
          variant="ghost"
          size="icon"
          aria-label="One more"
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}
