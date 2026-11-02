import type { ComponentProps, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/shared/lib/cn';

type CounterItemProps = ComponentProps<'button'> & {
  goods: ReactNode;
  label: string;
  isActive: boolean;
};

// One place on the counter: the goods rise a little when you reach for them, the label sits below.
export function CounterItem({
  goods,
  label,
  isActive,
  className,
  ...buttonProps
}: CounterItemProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        'group flex h-auto w-[92px] flex-col items-center gap-2 rounded-lg px-2 pt-2.5 pb-2 transition-colors duration-150 hover:text-mortar-cream focus-visible:ring-2 focus-visible:ring-mustard/70',
        isActive ? 'bg-mortar-cream/10 hover:bg-mortar-cream/10' : 'hover:bg-mortar-cream/6',
        className,
      )}
      {...buttonProps}
    >
      <span
        className={cn(
          'flex h-11 items-end justify-center transition-transform duration-200 ease-settle group-hover:-translate-y-0.5',
          isActive && '-translate-y-0.5',
        )}
      >
        {goods}
      </span>
      <span
        className={cn(
          'label-caps',
          isActive ? 'text-mustard' : 'text-mortar-cream/80 group-hover:text-mortar-cream',
        )}
      >
        {label}
      </span>
    </Button>
  );
}
