import { cn } from '@/shared/lib/cn';

const ORDER_STAGES = [
  { label: 'Proof approved', note: 'Just now' },
  { label: 'On the press', note: 'Within 2 working days' },
  { label: 'Packed and shipped', note: 'Tracking by email' },
] as const;

// What a real order would go through next, as a short timeline; the first stage is already done.
export function NextSteps() {
  return (
    <ol aria-label="What happens next" className="grid gap-0">
      {ORDER_STAGES.map((stage, stageIndex) => {
        const isDone = stageIndex === 0;
        const isLast = stageIndex === ORDER_STAGES.length - 1;
        return (
          <li key={stage.label} className="relative grid grid-cols-[1.25rem_1fr] gap-3 pb-3">
            <span
              aria-hidden
              className={cn(
                'relative z-10 mt-1 size-3 justify-self-center rounded-full border-2',
                isDone ? 'border-shop-green bg-shop-green' : 'border-brick-ink/25 bg-mortar-cream',
              )}
            />
            {!isLast && (
              <span
                aria-hidden
                className="absolute top-4 bottom-0 left-[0.625rem] w-px -translate-x-1/2 bg-brick-ink/15"
              />
            )}
            <span className="text-sm leading-tight">
              <span className={cn('block', isDone ? 'font-medium' : 'text-brick-ink/75')}>
                {stage.label}
              </span>
              <span className="text-xs text-muted-foreground">{stage.note}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
