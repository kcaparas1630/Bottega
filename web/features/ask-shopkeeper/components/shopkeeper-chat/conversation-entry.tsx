import type { ConversationMessage } from '@/entities/shopkeeper';
import { cn } from '@/shared/lib/cn';

import { SuggestedPhotos } from './conversation-entry/suggested-photos';

export function ConversationEntry({ message }: { message: ConversationMessage }) {
  const isFromShopkeeper = message.author === 'shopkeeper';
  return (
    <article
      className={cn(
        'flex animate-paper-settle flex-col gap-2',
        isFromShopkeeper ? 'items-start' : 'items-end',
      )}
    >
      <p
        className={cn(
          'max-w-[92%] rounded-md border border-brick-ink/25 px-4 py-3 text-[15px] leading-relaxed shadow-hairline',
          isFromShopkeeper ? 'bg-white text-brick-ink' : 'bg-shop-green text-mortar-cream',
        )}
      >
        {isFromShopkeeper && (
          <span className="mb-1 block label-caps text-brick-red">The shopkeeper</span>
        )}
        {message.text}
      </p>
      {message.suggestions.length > 0 && <SuggestedPhotos photos={message.suggestions} />}
    </article>
  );
}
