'use client';

import { useRef, useState } from 'react';

import { Input } from '@/components/ui/input';
import { useCanvasStore } from '@/entities/canvas';

const MAX_NAME_LENGTH = 80;

// The canvas name, edited in place: Enter or leaving the field saves, Escape puts it back.
export function CanvasNameField() {
  const name = useCanvasStore((state) => state.design?.name);
  const renameDesign = useCanvasStore((state) => state.renameDesign);
  const [draft, setDraft] = useState<string | null>(null);
  const isCancellingRef = useRef(false);
  if (name === undefined) return <span className="h-5 w-40 animate-pulse rounded bg-warm-sand" />;

  function commitDraft(text: string) {
    const trimmedName = text.trim();
    if (!isCancellingRef.current && trimmedName && trimmedName !== name) renameDesign(trimmedName);
    isCancellingRef.current = false;
    setDraft(null);
  }

  return (
    <Input
      aria-label="Canvas name"
      value={draft ?? name}
      maxLength={MAX_NAME_LENGTH}
      spellCheck={false}
      onChange={(event) => setDraft(event.target.value)}
      onBlur={(event) => commitDraft(event.currentTarget.value)}
      onKeyDown={(event) => {
        if (event.key === 'Escape') isCancellingRef.current = true;
        if (event.key === 'Enter' || event.key === 'Escape') event.currentTarget.blur();
      }}
      className="field-sizing-content h-8 w-auto max-w-80 min-w-24 truncate border-transparent bg-transparent px-2 font-semibold text-brick-ink shadow-none hover:border-brick-ink/15 focus-visible:border-shop-green focus-visible:bg-white/60 focus-visible:ring-2 focus-visible:ring-shop-green/15 md:text-sm"
    />
  );
}
