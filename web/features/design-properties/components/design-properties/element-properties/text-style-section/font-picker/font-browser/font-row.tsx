import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { fontFamilyStyle, isHouseFont } from '@/entities/canvas';
import type { CatalogFont, FontCategory } from '@/entities/font';
import { cn } from '@/shared/lib/cn';
import { previewFamilyName } from '@/shared/hooks/use-font-previews';

type FontRowProps = {
  font: CatalogFont;
  isCurrent: boolean;
  onPick: (font: CatalogFont) => void;
};

const CATEGORY_LABELS: Record<FontCategory, string> = {
  serif: 'Serif',
  'sans-serif': 'Sans',
  display: 'Display',
  handwriting: 'Script',
  monospace: 'Mono',
};

// One family, its name set in its own face (a preview subset for Google fonts).
export function FontRow({ font, isCurrent, onPick }: FontRowProps) {
  const previewStyle = isHouseFont(font.family)
    ? fontFamilyStyle(font.family, font.defaultWeight)
    : {
        fontFamily: `'${previewFamilyName(font.family)}', system-ui`,
        fontWeight: font.defaultWeight,
      };
  return (
    <Button
      type="button"
      variant="ghost"
      aria-pressed={isCurrent}
      onClick={() => onPick(font)}
      className={cn(
        'h-11 w-full justify-start gap-2 rounded-md px-2.5 text-left font-normal transition-colors outline-none hover:text-brick-ink focus-visible:ring-2 focus-visible:ring-shop-green/40',
        isCurrent ? 'bg-white hover:bg-white' : 'hover:bg-white/70',
      )}
    >
      <span className="min-w-0 flex-1 truncate text-lg leading-none" style={previewStyle}>
        {font.family}
      </span>
      <span className="shrink-0 text-xs text-brick-ink/45">{CATEGORY_LABELS[font.category]}</span>
      <Check
        aria-hidden
        className={cn('size-4 shrink-0 text-brick-ink', !isCurrent && 'invisible')}
      />
    </Button>
  );
}
