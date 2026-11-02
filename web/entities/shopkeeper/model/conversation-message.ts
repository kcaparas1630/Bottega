import type { ShopkeeperTranscriptEntry } from '@bottega/server';

export type ConversationMessage = ShopkeeperTranscriptEntry;

export const SHOPKEEPER_WELCOME: ConversationMessage = {
  id: 'shopkeeper-welcome',
  author: 'shopkeeper',
  text: "Welcome in. Tell me what you're making and who it's for; I know where the good paper is, and the photos too.",
  suggestions: [],
};
