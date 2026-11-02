import { useRef, useState } from 'react';

import { readCanvasSummary } from '@/entities/canvas';
import {
  SHOPKEEPER_WELCOME,
  useAskShopkeeper,
  type ConversationMessage,
} from '@/entities/shopkeeper';

const MISSED_REPLY = "Sorry, I didn't catch that over the bell. Mind asking again?";

// Holds the conversation and sends each question with a summary of the current paper.
export function useShopkeeperConversation() {
  const [messages, setMessages] = useState<ConversationMessage[]>([SHOPKEEPER_WELCOME]);
  const messageCountRef = useRef(0);
  const { mutate: askShopkeeper, isPending: isShopkeeperReplying } = useAskShopkeeper();

  function appendMessage(message: Omit<ConversationMessage, 'id'>) {
    messageCountRef.current += 1;
    const id = `${message.author}-${messageCountRef.current}`;
    setMessages((currentMessages) => [...currentMessages, { ...message, id }]);
  }

  function sendMessage(text: string) {
    const question = text.trim();
    if (!question || isShopkeeperReplying) return;
    appendMessage({ author: 'customer', text: question, suggestions: [] });
    askShopkeeper(
      { message: question, canvasSummary: readCanvasSummary() },
      {
        onSuccess: ({ reply, suggestions }) =>
          appendMessage({ author: 'shopkeeper', text: reply, suggestions }),
        onError: () => appendMessage({ author: 'shopkeeper', text: MISSED_REPLY, suggestions: [] }),
      },
    );
  }

  return { messages, sendMessage, isShopkeeperReplying };
}
