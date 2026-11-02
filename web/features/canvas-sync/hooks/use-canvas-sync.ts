import { useEffect } from 'react';

import { createBlankDesign, useCanvasStore, useGetCanvas, useSaveCanvas } from '@/entities/canvas';

const WORKBENCH_DESIGN_ID = 'workbench';
const AUTOSAVE_DELAY_MS = 800;

export type CanvasSyncState = 'loading' | 'saving' | 'saved' | 'failed';

// Shows a blank page at once, swaps in the saved design if one arrives before any edit, then autosaves.
export function useCanvasSync(): CanvasSyncState {
  const { data: savedDesign, isError: didLoadFail } = useGetCanvas(
    { designId: WORKBENCH_DESIGN_ID },
    { staleTime: Number.POSITIVE_INFINITY, refetchOnWindowFocus: false },
  );
  const isDesignLoaded = useCanvasStore((state) => state.design !== null);
  const loadDesign = useCanvasStore((state) => state.loadDesign);
  const editRevision = useCanvasStore((state) => state.editRevision);
  const { mutate: saveDesign, isPending: isSaving, isError: didSaveFail } = useSaveCanvas();

  useEffect(() => {
    if (!useCanvasStore.getState().design) loadDesign(createBlankDesign(WORKBENCH_DESIGN_ID));
  }, [loadDesign]);

  useEffect(() => {
    if (savedDesign && useCanvasStore.getState().editRevision === 0) loadDesign(savedDesign);
  }, [savedDesign, loadDesign]);

  useEffect(() => {
    if (editRevision === 0) return;
    const autosaveTimer = window.setTimeout(() => {
      const { design } = useCanvasStore.getState();
      if (design) saveDesign(design);
    }, AUTOSAVE_DELAY_MS);
    return () => window.clearTimeout(autosaveTimer);
  }, [editRevision, saveDesign]);

  if (!isDesignLoaded) return 'loading';
  if (isSaving) return 'saving';
  return didSaveFail || didLoadFail ? 'failed' : 'saved';
}
