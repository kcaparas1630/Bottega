import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { TooltipProvider } from '@/components/ui/tooltip';
import { TrpcProvider } from '@/shared/api/trpc-provider';
import { bodyFont, displayFont } from '@/shared/config/fonts';
import { cn } from '@/shared/lib/cn';
import '@/shared/styles/globals.css';

export const metadata: Metadata = {
  title: 'Bottega · the design workshop',
  description:
    'Design mugs, t-shirts and greeting cards with licensed Stocksy photography, helped by the shopkeeper.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn(displayFont.variable, bodyFont.variable)}>
      <body className="bg-background font-sans text-foreground antialiased">
        <TrpcProvider>
          <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}
