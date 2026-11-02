'use client';

import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/shared/lib/cn';

type NumberFieldProps = {
  // A short visible prefix such as "W" or "X"; the accessible name comes from ariaLabel.
  prefix: ReactNode;
  ariaLabel: string;
  value: number;
  onCommit: (value: number) => void;
  min?: number;
  max?: number;
  suffix?: string;
  className?: string;
};

const LARGE_STEP = 10;

// Whole-number input that commits on Enter or blur; arrow keys step by 1, or 10 with Shift.
export function NumberField({
  prefix,
  ariaLabel,
  value,
  onCommit,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  suffix,
  className,
}: NumberFieldProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const isCancellingRef = useRef(false);
  const clamp = (candidate: number) => Math.min(max, Math.max(min, Math.round(candidate)));

  function commitDraft(text: string) {
    if (isCancellingRef.current) {
      isCancellingRef.current = false;
      setDraft(null);
      return;
    }
    const parsedValue = Number.parseFloat(text);
    if (Number.isFinite(parsedValue) && clamp(parsedValue) !== value) onCommit(clamp(parsedValue));
    setDraft(null);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') event.currentTarget.blur();
    if (event.key === 'Escape') {
      isCancellingRef.current = true;
      event.currentTarget.blur();
    }
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    event.preventDefault();
    const stepSize = event.shiftKey ? LARGE_STEP : 1;
    onCommit(clamp(value + (event.key === 'ArrowUp' ? stepSize : -stepSize)));
    setDraft(null);
  }

  return (
    <label
      className={cn(
        'flex h-10 min-w-0 items-center gap-2 rounded-md border border-brick-ink/25 bg-white/70 px-2.5 text-sm transition-colors',
        'focus-within:border-shop-green focus-within:bg-white focus-within:ring-2 focus-within:ring-shop-green/20 hover:bg-white',
        className,
      )}
    >
      <span className="shrink-0 text-xs font-bold text-brick-ink/50">{prefix}</span>
      <Input
        inputMode="numeric"
        aria-label={ariaLabel}
        value={draft ?? String(Math.round(value))}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={(event) => commitDraft(event.currentTarget.value)}
        onKeyDown={handleKeyDown}
        className="h-auto rounded-none border-0 bg-transparent p-0 font-medium text-brick-ink tabular-nums shadow-none focus-visible:ring-0 md:text-sm"
      />
      {suffix && <span className="shrink-0 text-[13px] text-brick-ink/45">{suffix}</span>}
    </label>
  );
}
