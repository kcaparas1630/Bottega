'use client';

import { ChevronLeft, ChevronRight, CreditCard, LayoutGrid, Package, PenTool } from 'lucide-react';
import { useState } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { cn } from '@/shared/lib/cn';

import { RailNavItem } from './app-rail/rail-nav-item';

// Only the canvas is open so far; the other sections are listed and switched off.
const SECTIONS = [
  { label: 'Canvas', href: '/', icon: <PenTool />, isAvailable: true },
  { label: 'Canvases', href: '/canvases', icon: <LayoutGrid />, isAvailable: false },
  { label: 'Orders', href: '/orders', icon: <Package />, isAvailable: false },
  { label: 'Payments', href: '/payments', icon: <CreditCard />, isAvailable: false },
];

// The shop's ink rail: opens wide with labels; the round toggle on its right border collapses it.
export function AppRail() {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleLabel = isExpanded ? 'Collapse menu' : 'Expand menu';
  return (
    <nav
      aria-label="Sections"
      className={cn(
        'relative z-30 flex shrink-0 flex-col bg-brick-ink transition-[width] duration-200 ease-settle',
        isExpanded ? 'w-[220px]' : 'w-20',
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon-xs"
            aria-label={toggleLabel}
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded((wasExpanded) => !wasExpanded)}
            className="absolute top-4 -right-[18px] size-6 rounded-full border-brick-ink/20 bg-chrome text-brick-ink shadow-raised hover:bg-white hover:text-brick-ink focus-visible:ring-2 focus-visible:ring-shop-green/50 [&_svg]:stroke-2 [&_svg:not([class*='size-'])]:size-3.5"
          >
            {isExpanded ? <ChevronLeft /> : <ChevronRight />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">{toggleLabel}</TooltipContent>
      </Tooltip>
      <ul className="flex flex-col gap-1 overflow-hidden px-2 pt-4 pb-3">
        {SECTIONS.map((section) => (
          <li key={section.label}>
            <RailNavItem {...section} isCurrent={section.href === '/'} isExpanded={isExpanded} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
