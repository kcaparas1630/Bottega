'use client';

import { PackageOpen } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { ProofRoom } from './export-design/proof-room';

type ExportDesignProps = {
  // Renders the current design at a pixel width; the parent supplies it so features stay independent.
  renderDesign: (widthPx: number) => ReactNode;
};

// After the editor settles, quietly fetch the 3D studio and the picture maker so Export opens straight into 3D.
const WARM_UP_DELAY_MS = 1500;

function warmUpProof() {
  void import('./shared/product-scene');
  void import('modern-screenshot');
}

// The pinned Export button and its proof: the design on a product in 3D, its options, and a demo checkout.
export function ExportDesign({ renderDesign }: ExportDesignProps) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const warmUpTimer = window.setTimeout(warmUpProof, WARM_UP_DELAY_MS);
    return () => window.clearTimeout(warmUpTimer);
  }, []);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="h-9 rounded-md border border-mortar-cream/25 bg-brick-red px-4 text-[13px] font-semibold text-mortar-cream shadow-hairline hover:bg-brick-red/90 [&_svg]:size-4">
          <PackageOpen />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="flex h-[min(50rem,calc(100dvh-2rem))] w-[min(80rem,calc(100vw-2rem))] max-w-none flex-col gap-0 overflow-hidden rounded-xl border-0 bg-mortar-cream p-0 sm:max-w-none"
      >
        <ProofRoom renderDesign={renderDesign} onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
