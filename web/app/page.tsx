import { AppRail } from '@/widgets/app-rail';
import { CanvasWorkspace } from '@/widgets/canvas-workspace';
import { EditorHeader } from '@/widgets/editor-header';
import { InspectorPanel } from '@/widgets/inspector-panel';

// The shop: storefront across the top, aisles on the left, the wall in the middle, the order pad on the right.
export default function EditorPage() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-brick-ink">
      <EditorHeader />
      <div className="flex min-h-0 flex-1">
        <AppRail />
        <CanvasWorkspace />
        <InspectorPanel />
      </div>
    </div>
  );
}
