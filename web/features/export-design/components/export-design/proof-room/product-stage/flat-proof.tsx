import type { ReactNode } from 'react';

type FlatProofProps = {
  renderDesign: (widthPx: number) => ReactNode;
};

// The design shown flat, in place of the 3D proof, when this browser cannot draw it.
export function FlatProof({ renderDesign }: FlatProofProps) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-5 p-8">
      <div className="shadow-paper-lifted">{renderDesign(260)}</div>
      <p role="status" className="max-w-xs text-center text-[13px] text-brick-ink/60">
        The 3D proof could not be drawn in this browser, so here is your design flat.
      </p>
    </div>
  );
}
