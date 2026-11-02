import type Anthropic from '@anthropic-ai/sdk';

import type { ShopkeeperTranscriptEntry } from './shopkeeper-conversation';

export type ShopkeeperConversation = {
  // Everything Claude has seen, append-only so the cached prefix and thinking blocks stay valid.
  modelMessages: Anthropic.MessageParam[];
  transcript: ShopkeeperTranscriptEntry[];
};

export type ShopkeeperExchange = {
  question: Anthropic.MessageParam;
  answer: Anthropic.MessageParam;
  customerEntry: Omit<ShopkeeperTranscriptEntry, 'id' | 'author'>;
  shopkeeperEntry: Omit<ShopkeeperTranscriptEntry, 'id' | 'author'>;
};

type ConversationRegistry = typeof globalThis & {
  bottegaShopkeeperConversations?: Map<string, ShopkeeperConversation>;
};

const EMPTY_CONVERSATION: ShopkeeperConversation = { modelMessages: [], transcript: [] };

// In memory on globalThis like the designs, keyed by design id; see docs/adr/026.
const conversationsByDesignId = ((
  globalThis as ConversationRegistry
).bottegaShopkeeperConversations ??= new Map<string, ShopkeeperConversation>());

export function readConversation(designId: string) {
  return conversationsByDesignId.get(designId) ?? EMPTY_CONVERSATION;
}

export function recordExchange(designId: string, exchange: ShopkeeperExchange) {
  const { modelMessages, transcript } = readConversation(designId);
  conversationsByDesignId.set(designId, {
    modelMessages: [...modelMessages, exchange.question, exchange.answer],
    transcript: [
      ...transcript,
      { id: crypto.randomUUID(), author: 'customer', ...exchange.customerEntry },
      { id: crypto.randomUUID(), author: 'shopkeeper', ...exchange.shopkeeperEntry },
    ],
  });
}
