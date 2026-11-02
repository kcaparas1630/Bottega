import { Copy, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useCanvasStore } from '@/entities/canvas';
import { cn } from '@/shared/lib/cn';

type QuickActionsProps = {
  elementId: string;
  placement: 'above' | 'below';
};

// The small floating bar over a selection: the two actions people reach for most.
export function QuickActions({ elementId, placement }: QuickActionsProps) {
  const duplicateElement = useCanvasStore((state) => state.duplicateElement);
  const removeElement = useCanvasStore((state) => state.removeElement);
  const actions = [
    {
      label: 'Duplicate',
      shortcut: 'Ctrl D',
      icon: <Copy />,
      run: () => duplicateElement(elementId),
    },
    { label: 'Delete', shortcut: 'Del', icon: <Trash2 />, run: () => removeElement(elementId) },
  ];
  return (
    <div
      role="toolbar"
      aria-label="Quick actions"
      className={cn(
        'pointer-events-auto absolute left-1/2 flex -translate-x-1/2 items-center gap-0.5 rounded-md border border-brick-ink/25 bg-mortar-cream p-0.5 shadow-hairline',
        placement === 'above' ? 'bottom-[calc(100%+14px)]' : 'top-[calc(100%+14px)]',
      )}
      onPointerDown={(event) => event.stopPropagation()}
    >
      {actions.map(({ label, shortcut, icon, run }) => (
        <Tooltip key={label}>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label={label} onClick={run}>
              {icon}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {label} <span className="opacity-60">{shortcut}</span>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
