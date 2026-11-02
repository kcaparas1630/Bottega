import { Textarea } from '@/components/ui/textarea';
import type { TextElement } from '@/entities/canvas';

import { textElementStyle } from '../../../lib/text-element-style';

const MAX_TEXT_LENGTH = 280;

type TextEditOverlayProps = {
  element: TextElement;
  onFinish: (content: string) => void;
};

// Edits text in place with identical type, committing on blur, Escape or Ctrl+Enter.
export function TextEditOverlay({ element, onFinish }: TextEditOverlayProps) {
  return (
    <Textarea
      autoFocus
      aria-label="Edit text"
      defaultValue={element.content}
      maxLength={MAX_TEXT_LENGTH}
      className="absolute inset-0 [field-sizing:fixed] min-h-0 resize-none overflow-hidden rounded-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
      style={textElementStyle(element)}
      onPointerDown={(event) => event.stopPropagation()}
      onFocus={(event) => event.currentTarget.select()}
      onBlur={(event) => onFinish(event.currentTarget.value)}
      onKeyDown={(event) => {
        const isCommitShortcut = event.key === 'Enter' && (event.metaKey || event.ctrlKey);
        if (event.key === 'Escape' || isCommitShortcut) event.currentTarget.blur();
      }}
    />
  );
}
