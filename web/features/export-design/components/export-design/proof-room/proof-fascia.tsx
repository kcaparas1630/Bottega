import { Check, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/shared/lib/cn';
import { BrandMark } from '@/shared/ui/brand-mark';

import { EXPORT_STEPS, type ExportStep } from '../../../lib/export-steps';

// The proof's own fascia, like the editor's: sign-written title, the steps in brass, a brick band below.
export function ProofFascia({ currentStep }: { currentStep: ExportStep }) {
  const currentIndex = EXPORT_STEPS.findIndex(({ step }) => step === currentStep);
  return (
    <header className="shrink-0">
      <div className="flex h-16 items-center gap-3.5 bg-shop-green pr-3 pl-6 text-mortar-cream">
        <BrandMark className="size-5 text-mustard" />
        <DialogTitle className="font-serif-display text-2xl leading-none font-medium tracking-[0.01em]">
          Take it to print
        </DialogTitle>
        <DialogDescription className="sr-only">
          See your design on a product in 3D, choose its options, then try the demo checkout.
        </DialogDescription>
        <ol aria-label="Steps" className="ml-auto hidden items-stretch gap-7 self-stretch sm:flex">
          {EXPORT_STEPS.map(({ step, label }, stepIndex) => {
            const isCurrent = stepIndex === currentIndex;
            const isDone = stepIndex < currentIndex;
            return (
              <li
                key={step}
                aria-current={isCurrent ? 'step' : undefined}
                className={cn(
                  'flex items-center gap-2 border-b-2 border-transparent pt-0.5 label-caps tracking-[0.16em] text-mortar-cream/50 transition-colors duration-300',
                  isCurrent && 'border-mustard text-mustard',
                  isDone && 'text-mortar-cream/85',
                )}
              >
                {isDone ? (
                  <Check className="size-3.5" aria-label="Done" />
                ) : (
                  <span className="tabular-nums">{stepIndex + 1}</span>
                )}
                {label}
              </li>
            );
          })}
        </ol>
        <DialogClose asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close"
            className="ml-auto text-mortar-cream/75 hover:bg-mortar-cream/10 hover:text-mortar-cream sm:ml-4"
          >
            <X />
          </Button>
        </DialogClose>
      </div>
      <div aria-hidden className="h-px bg-mustard/70" />
      <div aria-hidden className="h-1 bg-brick-red" />
    </header>
  );
}
