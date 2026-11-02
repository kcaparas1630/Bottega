import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { FontCategory } from '@/entities/font';

type FontFiltersProps = {
  query: string;
  onQueryChange: (query: string) => void;
  category: FontCategory | null;
  onCategoryChange: (category: FontCategory | null) => void;
  fontCount: number | undefined;
};

// The toggle group needs a value for "no kind chosen".
const ALL_KINDS = 'all';

const CATEGORY_OPTIONS: readonly { value: FontCategory | null; label: string }[] = [
  { value: null, label: 'All' },
  { value: 'serif', label: 'Serif' },
  { value: 'sans-serif', label: 'Sans' },
  { value: 'display', label: 'Display' },
  { value: 'handwriting', label: 'Script' },
  { value: 'monospace', label: 'Mono' },
];

// Narrows the collection: a name search and one-tap kinds of type.
export function FontFilters({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  fontCount,
}: FontFiltersProps) {
  return (
    <div className="flex flex-col gap-2.5 border-b border-brick-ink/12 p-3">
      <label className="flex h-10 items-center gap-2 rounded-md border border-brick-ink/25 bg-white/70 px-3 focus-within:border-shop-green focus-within:ring-2 focus-within:ring-shop-green/20">
        <Search aria-hidden className="size-4 shrink-0 text-brick-ink/50" />
        <Input
          type="search"
          autoFocus
          value={query}
          aria-label="Search fonts"
          placeholder={`Search ${fontCount ?? 'all'} fonts…`}
          onChange={(event) => onQueryChange(event.target.value)}
          className="h-auto rounded-none border-0 bg-transparent p-0 shadow-none placeholder:text-brick-ink/45 focus-visible:ring-0 md:text-sm [&::-webkit-search-cancel-button]:hidden"
        />
      </label>
      <ToggleGroup
        type="single"
        spacing={1.5}
        aria-label="Font kinds"
        value={category ?? ALL_KINDS}
        onValueChange={(chosenKind) => {
          const option = CATEGORY_OPTIONS.find(({ value }) => (value ?? ALL_KINDS) === chosenKind);
          if (option) onCategoryChange(option.value);
        }}
        className="flex-wrap"
      >
        {CATEGORY_OPTIONS.map((option) => (
          <ToggleGroupItem
            key={option.label}
            value={option.value ?? ALL_KINDS}
            variant="outline"
            className="h-7 min-w-0 rounded-md border-brick-ink/15 bg-white/50 px-2.5 text-[13px] font-medium text-brick-ink/75 shadow-none hover:border-brick-ink/40 hover:bg-white/50 hover:text-brick-ink data-[state=on]:border-brick-ink data-[state=on]:bg-brick-ink data-[state=on]:text-mortar-cream"
          >
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
