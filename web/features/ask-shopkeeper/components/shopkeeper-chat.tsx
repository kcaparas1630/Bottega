'use client';

import { useEffect, useRef } from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';

import { ConversationEntry } from './shopkeeper-chat/conversation-entry';
import { ShopkeeperComposer } from './shopkeeper-chat/shopkeeper-composer';
import { useShopkeeperConversation } from '../hooks/use-shopkeeper-conversation';

export function ShopkeeperChat() {
  const { messages, sendMessage, isShopkeeperReplying } = useShopkeeperConversation();
  const conversationEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, [messages.length, isShopkeeperReplying]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <ScrollArea className="min-h-0 flex-1">
        <ol aria-live="polite" className="flex flex-col gap-3 p-4">
          {messages.map((message) => (
            <li key={message.id}>
              <ConversationEntry message={message} />
            </li>
          ))}
          {isShopkeeperReplying && (
            <li className="font-serif-display text-sm text-muted-foreground italic">
              Checking the back room…
            </li>
          )}
        </ol>
        <div ref={conversationEndRef} />
      </ScrollArea>
      <ShopkeeperComposer onSend={sendMessage} isDisabled={isShopkeeperReplying} />
    </div>
  );
}
