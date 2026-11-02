'use client';

import { Sparkles } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShopkeeperChat } from '@/features/ask-shopkeeper';
import { DesignProperties } from '@/features/design-properties';
import { LayersList } from '@/features/layers-list';

// Index tabs: the open one is mustard, edged in a hairline, sitting on the panel's top rule.
const TAB_TRIGGER_CLASS =
  'label-caps -mb-px h-11 flex-none rounded-t-md rounded-b-none border border-b-0 border-transparent px-3 text-brick-ink/55 after:hidden! hover:text-brick-ink data-[state=active]:border-brick-ink/25! data-[state=active]:bg-mustard! data-[state=active]:text-brick-ink data-[state=active]:shadow-none!';

// The order pad on the right: what the selection is made of, the stack of layers, and the shopkeeper.
export function InspectorPanel() {
  return (
    <aside
      aria-label="Order pad"
      className="flex w-[360px] shrink-0 flex-col border-l border-brick-ink/15 bg-mortar-cream pt-3"
    >
      <Tabs defaultValue="design" className="min-h-0 flex-1 gap-0">
        <TabsList
          variant="line"
          className="h-auto w-full shrink-0 justify-start gap-0.5 rounded-none border-b border-brick-ink/15 bg-transparent p-0 px-4"
        >
          <TabsTrigger value="design" className={TAB_TRIGGER_CLASS}>
            Design
          </TabsTrigger>
          <TabsTrigger value="layers" className={TAB_TRIGGER_CLASS}>
            Layers
          </TabsTrigger>
          <TabsTrigger value="shopkeeper" className={TAB_TRIGGER_CLASS}>
            <Sparkles className="size-4" />
            Shopkeeper
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="design"
          className="min-h-0 [scrollbar-width:thin] overflow-y-auto bg-chrome"
        >
          <DesignProperties />
        </TabsContent>
        <TabsContent
          value="layers"
          className="min-h-0 [scrollbar-width:thin] overflow-y-auto bg-chrome"
        >
          <LayersList />
        </TabsContent>
        <TabsContent
          value="shopkeeper"
          forceMount
          className="flex min-h-0 flex-col bg-chrome data-[state=inactive]:hidden"
        >
          <ShopkeeperChat />
        </TabsContent>
      </Tabs>
    </aside>
  );
}
