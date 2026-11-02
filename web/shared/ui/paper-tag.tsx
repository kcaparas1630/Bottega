import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

type PaperTagProps = {
  children: ReactNode;
  tone?: 'cream' | 'mustard';
  className?: string;
};

// A small paper price tag with a punched string hole, for prices and shelf labels.
export function PaperTag({ children, tone = 'cream', className }: PaperTagProps) {
  return (
    <span
      className={cn(
        'relative inline-flex items-center gap-1.5 rounded-hand-sm py-0.5 pr-2 pl-4 text-[13px] font-medium text-brick-ink shadow-paper',
        tone === 'cream' ? 'bg-mortar-cream' : 'bg-mustard',
        className,
      )}
    >
      <span aria-hidden className="absolute left-1.5 size-1.5 rounded-full bg-warm-sand" />
      {children}
    </span>
  );
}
