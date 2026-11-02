export type ExportStep = 'proof' | 'checkout' | 'complete';

export const EXPORT_STEPS: readonly { step: ExportStep; label: string }[] = [
  { step: 'proof', label: 'Proof' },
  { step: 'checkout', label: 'Checkout' },
  { step: 'complete', label: 'Done' },
];
