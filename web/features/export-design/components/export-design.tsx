'use client';

import { PackageOpen } from 'lucide-react';
import { useState, type ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { ExportFlowPanel } from './export-design/export-flow-panel';

type ExportDesignProps = {
  // Renders the current design at a pixel width; the parent supplies it so features stay independent.
  renderDesign: (widthPx: number) => ReactNode;
};

// The pinned Export button and its one modal: pick a product, preview the fit, demo checkout.
export function ExportDesign({ renderDesign }: ExportDesignProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="h-9 rounded-md border border-mortar-cream/25 bg-brick-red px-4 text-[13px] font-semibold text-mortar-cream shadow-hairline hover:bg-brick-red/90 [&_svg]:size-4">
          <PackageOpen />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[92dvh] overflow-y-auto rounded-hand bg-mortar-cream sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-3xl">Take it to print</DialogTitle>
          <DialogDescription>
            Pick a product, check the fit, then try the demo checkout.
          </DialogDescription>
        </DialogHeader>
        <ExportFlowPanel renderDesign={renderDesign} onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
