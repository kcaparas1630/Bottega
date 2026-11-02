import { useRef, useState } from 'react';

import { readCurrentDesign, useCanvasStore } from '@/entities/canvas';
import {
  SHOPKEEPER_WELCOME,
  useAskShopkeeper,
  useGetShopkeeperConversation,
  type ConversationMessage,
} from '@/entities/shopkeeper';

const MISSED_REPLY = "Sorry, I didn't catch that over the bell. Mind asking again?";

// Saved chat plus new messages; questions carry the current design and replies may change it.
export function useShopkeeperConversation() {
  const designId = useCanvasStore((state) => state.design?.id ?? null);
  const replaceDesign = useCanvasStore((state) => state.replaceDesign);
  const { data: savedMessages = [] } = useGetShopkeeperConversation(
    { designId: designId ?? '' },
    {
      enabled: designId !== null,
      staleTime: Number.POSITIVE_INFINITY,
      refetchOnWindowFocus: false,
    },
  );
  const [newMessages, setNewMessages] = useState<ConversationMessage[]>([]);
  const messageCountRef = useRef(0);
  const { mutate: askShopkeeper, isPending: isShopkeeperReplying } = useAskShopkeeper();

  function appendMessage(message: Omit<ConversationMessage, 'id'>) {
    messageCountRef.current += 1;
    const id = `new-${message.author}-${messageCountRef.current}`;
    setNewMessages((currentMessages) => [...currentMessages, { ...message, id }]);
  }

  function sendMessage(text: string) {
    const question = text.trim();
    const design = readCurrentDesign();
    if (!question || !design || isShopkeeperReplying) return;
    appendMessage({ author: 'customer', text: question, suggestions: [] });
    askShopkeeper(
      { message: question, design },
      {
        onSuccess: ({ reply, suggestions, design: changedDesign }) => {
          if (changedDesign) replaceDesign(changedDesign);
          appendMessage({ author: 'shopkeeper', text: reply, suggestions });
        },
        onError: () => appendMessage({ author: 'shopkeeper', text: MISSED_REPLY, suggestions: [] }),
      },
    );
  }

  const messages = [SHOPKEEPER_WELCOME, ...savedMessages, ...newMessages];
  return { messages, sendMessage, isShopkeeperReplying };
}
