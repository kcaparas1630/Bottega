import { useCanvasStore, type CanvasElement } from '@/entities/canvas';

import { readFrame } from '../../lib/resize-frame';
import { usePointerDrag } from '../../hooks/use-pointer-drag';
import { CanvasElementView } from '../shared/canvas-element-view';
import { TextEditOverlay } from './editable-element/text-edit-overlay';

type EditableElementProps = {
  element: CanvasElement;
  scale: number;
  isEditingText: boolean;
  onEditingTextChange: (isEditing: boolean) => void;
};

function describeElement(element: CanvasElement) {
  if (element.kind === 'image') return `Photo: ${element.photoTitle}`;
  if (element.kind === 'text') return element.content;
  return `Shape: ${element.shape}`;
}

// One element on the paper: press to select and drag, double-click text to type into it.
export function EditableElement({
  element,
  scale,
  isEditingText,
  onEditingTextChange,
}: EditableElementProps) {
  const selectElement = useCanvasStore((state) => state.selectElement);
  const setElementFrame = useCanvasStore((state) => state.setElementFrame);
  const styleText = useCanvasStore((state) => state.styleText);

  const moveHandlers = usePointerDrag({
    scale,
    onDragStart: () => {
      selectElement(element.id);
      return readFrame(element);
    },
    onDrag: (startFrame, { deltaX, deltaY }) =>
      setElementFrame(
        element.id,
        {
          x: Math.round(startFrame.x + deltaX),
          y: Math.round(startFrame.y + deltaY),
        },
        'continuous',
      ),
  });
  const startEditingText = () => {
    if (element.kind === 'text') onEditingTextChange(true);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={describeElement(element)}
      className="absolute cursor-move touch-none outline-clay/70 select-none hover:outline-solid"
      style={{
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        outlineWidth: 1.5 / scale,
      }}
      onFocus={() => selectElement(element.id)}
      onDoubleClick={startEditingText}
      onKeyDown={(event) => {
        if (event.key === 'Enter') startEditingText();
      }}
      {...(isEditingText ? {} : moveHandlers)}
    >
      {isEditingText && element.kind === 'text' ? (
        <TextEditOverlay
          element={element}
          onFinish={(content) => {
            styleText(element.id, { content });
            onEditingTextChange(false);
          }}
        />
      ) : (
        <CanvasElementView element={element} />
      )}
    </div>
  );
}
