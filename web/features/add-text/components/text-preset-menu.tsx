'use client';

import { Button } from '@/components/ui/button';
import { useCanvasStore, type TextPresetName } from '@/entities/canvas';
import { cn } from '@/shared/lib/cn';

const TEXT_PRESET_OPTIONS: readonly {
  presetName: TextPresetName;
  label: string;
  className: string;
}[] = [
  { presetName: 'heading', label: 'Add a heading', className: 'font-serif-display text-2xl' },
  { presetName: 'subheading', label: 'Add a subheading', className: 'text-base font-semibold' },
  { presetName: 'body', label: 'Add a little body text', className: 'text-sm' },
];

// Text presets, each previewed in its own type; picking one drops it in the middle of the page.
export function TextPresetMenu({ onTextAdded }: { onTextAdded: () => void }) {
  const addText = useCanvasStore((state) => state.addText);
  return (
    <section aria-label="Text" className="flex flex-col gap-1.5 p-3">
      <h2 className="px-1 pb-1 label-caps font-sans tracking-[0.08em] text-brick-ink/60">Text</h2>
      {TEXT_PRESET_OPTIONS.map(({ presetName, label, className }) => (
        <Button
          key={presetName}
          type="button"
          variant="outline"
          onClick={() => {
            addText(presetName);
            onTextAdded();
          }}
          className={cn(
            'h-auto justify-start rounded-md border-brick-ink/12 bg-white/50 px-3 py-2.5 text-left leading-tight font-normal whitespace-normal text-brick-ink shadow-none transition-colors hover:text-brick-ink',
            'outline-none hover:border-brick-ink/35 hover:bg-white focus-visible:ring-2 focus-visible:ring-shop-green/40',
            className,
          )}
        >
          {label}
        </Button>
      ))}
      <p className="px-1 pt-1 text-[11px] text-brick-ink/55">
        Double-click text on the page to type into it.
      </p>
    </section>
  );
}
