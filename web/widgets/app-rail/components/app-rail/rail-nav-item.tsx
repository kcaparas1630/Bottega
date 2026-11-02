import Link from 'next/link';
import type { ReactNode } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/shared/lib/cn';

type RailNavItemProps = {
  label: string;
  href: string;
  icon: ReactNode;
  isAvailable: boolean;
  isCurrent: boolean;
  isExpanded: boolean;
};

const BASE_CLASS =
  'flex rounded-lg font-medium whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-mortar-cream/50 [&_svg]:size-[22px] [&_svg]:shrink-0 [&_svg]:stroke-[1.5]';
const EXPANDED_CLASS = 'h-12 items-center gap-3 px-3.5 text-[15px]';
const COLLAPSED_CLASS = 'h-16 flex-col items-center justify-center gap-1.5 text-xs';

// One section: a row with icon and label when open, icon over a short label when collapsed.
export function RailNavItem({
  label,
  href,
  icon,
  isAvailable,
  isCurrent,
  isExpanded,
}: RailNavItemProps) {
  const layoutClass = cn(BASE_CLASS, isExpanded ? EXPANDED_CLASS : COLLAPSED_CLASS);
  if (!isAvailable) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            role="link"
            aria-disabled="true"
            tabIndex={0}
            className={cn(layoutClass, 'cursor-not-allowed text-mortar-cream/35')}
          >
            {icon}
            {label}
            {isExpanded && (
              <Badge
                variant="outline"
                className="ml-auto border-transparent bg-mortar-cream/8 px-1.5 text-[11px] font-semibold tracking-wider text-current uppercase"
              >
                Soon
              </Badge>
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent side="right">{label} · coming soon</TooltipContent>
      </Tooltip>
    );
  }
  return (
    <Link
      href={href}
      aria-current={isCurrent ? 'page' : undefined}
      className={cn(
        layoutClass,
        'transition-colors duration-150',
        isCurrent
          ? 'bg-brick-red text-mortar-cream'
          : 'text-mortar-cream/70 hover:bg-mortar-cream/8 hover:text-mortar-cream',
      )}
    >
      {icon}
      {label}
    </Link>
  );
}
