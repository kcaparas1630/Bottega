import type { LibraryPhoto } from '@bottega/server';

export type ConversationMessage = {
  id: string;
  author: 'customer' | 'shopkeeper';
  text: string;
  suggestions: LibraryPhoto[];
};

export const SHOPKEEPER_WELCOME: ConversationMessage = {
  id: 'shopkeeper-welcome',
  author: 'shopkeeper',
  text: "Welcome in. Tell me what you're making and who it's for; I know where the good paper is, and the photos too.",
  suggestions: [],
};
