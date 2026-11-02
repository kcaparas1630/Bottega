'use client';

import { useState } from 'react';

import { useCanvasStore, useSelectedElement } from '@/entities/canvas';

import { EditableElement } from './canvas-stage/editable-element';
import { SelectionFrame } from './canvas-stage/selection-frame';
import { usePhotoDrop } from '../hooks/use-photo-drop';
import { useStageKeyboard } from '../hooks/use-stage-keyboard';
import { STAGE_PADDING, useStageZoom } from '../hooks/use-stage-zoom';
import { ZoomControls } from './canvas-stage/zoom-controls';
import { PaperArtboard } from './shared/paper-artboard';

// The wall: the page hung above the counter, zoomable, with the selection drawn over the clip.
export function CanvasStage() {
  const design = useCanvasStore((state) => state.design);
  const selectElement = useCanvasStore((state) => state.selectElement);
  const selectedElement = useSelectedElement();
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const { attachViewport, ...zoom } = useStageZoom(design);
  const photoDropHandlers = usePhotoDrop(zoom.scale);
  useStageKeyboard();

  return (
    <div className="relative size-full">
      <div
        ref={attachViewport}
        className="size-full [scrollbar-width:thin] overflow-auto"
        onPointerDown={() => selectElement(null)}
      >
        <div
          className="flex min-h-full w-max min-w-full items-center justify-center"
          style={{
            padding: `${STAGE_PADDING.top}px ${STAGE_PADDING.side}px ${STAGE_PADDING.bottom}px`,
          }}
        >
          {design && zoom.scale > 0 ? (
            <div
              className="relative shrink-0 animate-paper-settle"
              style={{ width: design.width * zoom.scale, height: design.height * zoom.scale }}
            >
              <PaperArtboard
                design={design}
                scale={zoom.scale}
                className="shadow-paper-lifted"
                {...photoDropHandlers}
              >
                {design.elements.map((element) => (
                  <EditableElement
                    key={element.id}
                    element={element}
                    scale={zoom.scale}
                    isEditingText={editingTextId === element.id}
                    onEditingTextChange={(isEditing) =>
                      setEditingTextId(isEditing ? element.id : null)
                    }
                  />
                ))}
              </PaperArtboard>
              {selectedElement && selectedElement.id !== editingTextId && (
                <SelectionFrame element={selectedElement} scale={zoom.scale} />
              )}
            </div>
          ) : (
            <p className="font-serif-display text-lg text-muted-foreground">
              Setting out the paper…
            </p>
          )}
        </div>
      </div>
      <ZoomControls zoom={zoom} className="absolute right-4 bottom-4" />
    </div>
  );
}
