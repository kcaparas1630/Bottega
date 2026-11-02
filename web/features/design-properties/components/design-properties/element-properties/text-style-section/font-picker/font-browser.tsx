import { useDeferredValue, useState } from 'react';

import { Button } from '@/components/ui/button';
import { HOUSE_FONT_FAMILIES } from '@/entities/canvas';
import { useListFonts, type CatalogFont, type FontCategory } from '@/entities/font';
import { useFontPreviews } from '@/shared/hooks/use-font-previews';

import { FontFilters } from './font-browser/font-filters';
import { FontRow } from './font-browser/font-row';

type FontBrowserProps = {
  currentFamily: string;
  onPick: (font: CatalogFont) => void;
};

const PAGE_SIZE = 40;
const HOUSE_FONTS: readonly CatalogFont[] = HOUSE_FONT_FAMILIES.map((family) => ({
  family,
  category: family === 'Fraunces' ? 'serif' : 'sans-serif',
  defaultWeight: 400,
}));

// Searches the Google Fonts collection by name and kind, most popular first, Bottega's own pinned on top.
export function FontBrowser({ currentFamily, onPick }: FontBrowserProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<FontCategory | null>(null);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const deferredQuery = useDeferredValue(query);
  const { data: catalog, isPending } = useListFonts({
    query: deferredQuery,
    category: category ?? undefined,
    limit,
  });
  const isBrowsingAll = !deferredQuery.trim() && !category;
  const fonts = (catalog?.fonts ?? []).filter(
    (font) => !isBrowsingAll || !HOUSE_FONT_FAMILIES.includes(font.family),
  );
  useFontPreviews(fonts.map((font) => ({ family: font.family, weight: font.defaultWeight })));

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <FontFilters
        query={query}
        onQueryChange={(nextQuery) => {
          setQuery(nextQuery);
          setLimit(PAGE_SIZE);
        }}
        category={category}
        onCategoryChange={(nextCategory) => {
          setCategory(nextCategory);
          setLimit(PAGE_SIZE);
        }}
        fontCount={catalog?.total}
      />
      <div className="min-h-0 flex-1 [scrollbar-width:thin] overflow-y-auto p-1.5">
        {isBrowsingAll && (
          <section aria-label="Bottega fonts" className="mb-1 border-b border-brick-ink/10 pb-1">
            <h4 className="px-2.5 pt-2 pb-1 label-caps text-brick-ink/50">Bottega fonts</h4>
            {HOUSE_FONTS.map((font) => (
              <FontRow
                key={font.family}
                font={font}
                isCurrent={font.family === currentFamily}
                onPick={onPick}
              />
            ))}
          </section>
        )}
        {isPending && <p className="px-3 py-4 text-sm text-brick-ink/60">Opening the type case…</p>}
        {catalog?.total === 0 && (
          <p className="px-3 py-4 text-sm text-brick-ink/60">No fonts match “{deferredQuery}”.</p>
        )}
        {fonts.map((font) => (
          <FontRow
            key={font.family}
            font={font}
            isCurrent={font.family === currentFamily}
            onPick={onPick}
          />
        ))}
        {catalog && catalog.total > catalog.fonts.length && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => setLimit((currentLimit) => currentLimit + PAGE_SIZE)}
            className="my-1.5 h-9 w-full rounded-md text-sm font-medium text-brick-ink/70 hover:bg-brick-ink/6 hover:text-brick-ink"
          >
            Show more ({catalog.total - catalog.fonts.length} left)
          </Button>
        )}
      </div>
    </div>
  );
}
