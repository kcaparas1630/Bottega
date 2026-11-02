import { Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type ShelfSearchProps = {
  query: string;
  onQueryChange: (query: string) => void;
};

const TOPICS = ['Coffee', 'People', 'Nature', 'Food', 'Summer', 'Vintage', 'Workshop'];

// A search box with one-tap topics; tapping the active topic clears it.
export function ShelfSearch({ query, onQueryChange }: ShelfSearchProps) {
  const activeTopic = TOPICS.find((topic) => topic.toLowerCase() === query.trim().toLowerCase());
  return (
    <div className="flex flex-col gap-2 px-4 pt-3 pb-3">
      <label className="flex h-8 items-center gap-2 rounded-md border border-brick-ink/18 bg-white/60 px-2.5 transition-colors focus-within:border-shop-green focus-within:bg-white focus-within:ring-2 focus-within:ring-shop-green/20">
        <Search aria-hidden className="size-4 shrink-0 text-brick-ink/45" />
        <Input
          type="search"
          value={query}
          maxLength={80}
          aria-label="Search the shelf"
          placeholder="Search coffee, flowers, shopfronts…"
          onChange={(event) => onQueryChange(event.target.value)}
          className="h-auto rounded-none border-0 bg-transparent p-0 text-[13px] shadow-none placeholder:text-brick-ink/45 focus-visible:ring-0 md:text-[13px] [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Clear search"
            onClick={() => onQueryChange('')}
            className="size-5 rounded-full text-brick-ink/50 hover:bg-warm-sand hover:text-brick-ink"
          >
            <X className="size-3.5" />
          </Button>
        )}
      </label>
      <ToggleGroup
        type="single"
        spacing={1}
        aria-label="Topics"
        value={activeTopic ?? ''}
        onValueChange={onQueryChange}
        className="flex-wrap"
      >
        {TOPICS.map((topic) => (
          <ToggleGroupItem
            key={topic}
            value={topic}
            variant="outline"
            className="h-6 min-w-0 rounded-md border-brick-ink/15 bg-white/50 px-2 text-xs font-medium text-brick-ink/70 shadow-none hover:border-brick-ink/40 hover:bg-white/50 hover:text-brick-ink data-[state=on]:border-brick-ink data-[state=on]:bg-brick-ink data-[state=on]:text-mortar-cream"
          >
            {topic}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
