import { SendHorizontal } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const QUICK_QUESTIONS = [
  'Something warm for a mug',
  'Flowers for a birthday card',
  'Help me lay this out',
];

type ShopkeeperComposerProps = {
  onSend: (text: string) => void;
  isDisabled: boolean;
};

export function ShopkeeperComposer({ onSend, isDisabled }: ShopkeeperComposerProps) {
  const [draft, setDraft] = useState('');

  function sendDraft() {
    if (isDisabled || !draft.trim()) return;
    onSend(draft);
    setDraft('');
  }

  return (
    <form
      className="flex flex-col gap-3 border-t border-brick-ink/12 p-4"
      onSubmit={(event) => {
        event.preventDefault();
        sendDraft();
      }}
    >
      <div className="flex flex-wrap gap-2">
        {QUICK_QUESTIONS.map((question) => (
          <Button
            key={question}
            type="button"
            variant="outline"
            disabled={isDisabled}
            onClick={() => onSend(question)}
            className="h-auto rounded-full pressable bg-white/70 px-3 py-1 text-[13px] font-medium hover:bg-white hover:text-brick-ink"
          >
            {question}
          </Button>
        ))}
      </div>
      <div className="flex items-end gap-2">
        <Textarea
          value={draft}
          rows={2}
          maxLength={500}
          aria-label="Message the shopkeeper"
          placeholder="Ask about photos, layout, type…"
          className="min-h-0 resize-none rounded-md border border-brick-ink/25 bg-white/70 text-[15px] focus-visible:border-shop-green"
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== 'Enter' || event.shiftKey) return;
            event.preventDefault();
            sendDraft();
          }}
        />
        <Button type="submit" size="icon" aria-label="Send" disabled={isDisabled || !draft.trim()}>
          <SendHorizontal />
        </Button>
      </div>
    </form>
  );
}
