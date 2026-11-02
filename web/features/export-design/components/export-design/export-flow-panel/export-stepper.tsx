import { Check } from 'lucide-react';

import { cn } from '@/shared/lib/cn';

import { EXPORT_STEPS, type ExportStep } from '../../../lib/export-steps';

export function ExportStepper({ currentStep }: { currentStep: ExportStep }) {
  const currentIndex =
    currentStep === 'complete'
      ? EXPORT_STEPS.length
      : EXPORT_STEPS.findIndex(({ step }) => step === currentStep);
  return (
    <ol aria-label="Export steps" className="flex items-center gap-3">
      {EXPORT_STEPS.map(({ step, label }, stepIndex) => {
        const isDone = stepIndex < currentIndex;
        const isCurrent = stepIndex === currentIndex;
        return (
          <li
            key={step}
            aria-current={isCurrent ? 'step' : undefined}
            className="flex flex-1 items-center gap-2.5 text-sm"
          >
            <span
              className={cn(
                'flex size-7 shrink-0 items-center justify-center rounded-full border text-[13px] font-semibold transition-colors duration-300',
                isDone && 'border-shop-green bg-shop-green text-mortar-cream',
                isCurrent && 'border-brick-red bg-brick-red text-mortar-cream',
                !isDone && !isCurrent && 'border-brick-ink/25 text-muted-foreground',
              )}
            >
              {isDone ? <Check className="size-3.5" aria-label="Done" /> : stepIndex + 1}
            </span>
            <span className={isCurrent ? 'font-medium' : 'text-muted-foreground'}>{label}</span>
            {stepIndex < EXPORT_STEPS.length - 1 && (
              <span aria-hidden className="flex-1 border-t border-dashed border-brick-ink/20" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
