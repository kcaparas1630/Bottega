import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { fontFamilyStyle, useCanvasStore, type TextElement } from '@/entities/canvas';

import { FontBrowser } from './font-picker/font-browser';

// The current font, shown in its own face; opens the Google Fonts browser beside the panel.
export function FontPicker({ element }: { element: TextElement }) {
  const styleText = useCanvasStore((state) => state.styleText);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          aria-label={`Font: ${element.fontFamily}`}
          className="flex h-10 w-full items-center justify-between gap-2 rounded-md border border-brick-ink/25 bg-white/70 px-3 text-left font-normal text-brick-ink shadow-none transition-colors outline-none hover:bg-white hover:text-brick-ink focus-visible:ring-2 focus-visible:ring-shop-green/30"
        >
          <span
            className="truncate text-base leading-none"
            style={fontFamilyStyle(element.fontFamily, element.fontWeight)}
          >
            {element.fontFamily}
          </span>
          <ChevronDown aria-hidden className="size-4 shrink-0 text-brick-ink/50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="left"
        align="start"
        sideOffset={16}
        collisionPadding={16}
        className="flex h-[min(520px,calc(100dvh-120px))] w-80 flex-col overflow-hidden rounded-lg border-brick-ink/15 bg-mortar-cream p-0 shadow-float"
      >
        <FontBrowser
          currentFamily={element.fontFamily}
          onPick={(font) => {
            styleText(element.id, { fontFamily: font.family, fontWeight: font.defaultWeight });
            setIsOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
