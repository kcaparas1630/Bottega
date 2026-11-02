'use client';

import type { ReactNode } from 'react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/shared/lib/cn';

export type SegmentedOption<Value extends string> = {
  value: Value;
  label: ReactNode;
  // Needed when the label is only an icon.
  ariaLabel?: string;
};

type SegmentedControlProps<Value extends string> = {
  ariaLabel: string;
  value: Value;
  options: readonly SegmentedOption<Value>[];
  onChange: (value: Value) => void;
  className?: string;
};

// A one-of-many switch in an inked box; the chosen option is filled in ink, like a ticked order slip.
export function SegmentedControl<Value extends string>({
  ariaLabel,
  value,
  options,
  onChange,
  className,
}: SegmentedControlProps<Value>) {
  return (
    <ToggleGroup
      type="single"
      spacing={1}
      aria-label={ariaLabel}
      value={value}
      onValueChange={(chosenValue) => {
        const chosenOption = options.find((option) => option.value === chosenValue);
        if (chosenOption) onChange(chosenOption.value);
      }}
      className={cn(
        'h-10 w-full rounded-md border border-brick-ink/25 bg-white/50 p-[3px]',
        className,
      )}
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          aria-label={option.ariaLabel}
          className={cn(
            'h-full min-w-0 flex-1 shrink gap-1.5 rounded-md px-3 text-sm font-medium text-brick-ink/60 transition-colors duration-150',
            'hover:bg-brick-ink/8 hover:text-brick-ink focus-visible:ring-2 focus-visible:ring-shop-green/40',
            'data-[state=on]:bg-brick-ink data-[state=on]:text-mortar-cream data-[state=on]:hover:bg-brick-ink',
            '[&_svg]:size-[18px]',
          )}
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
