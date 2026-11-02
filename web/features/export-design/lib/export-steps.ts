export type ExportStep = 'pick-product' | 'preview' | 'checkout' | 'complete';

export const EXPORT_STEPS: readonly { step: Exclude<ExportStep, 'complete'>; label: string }[] = [
  { step: 'pick-product', label: 'Pick a product' },
  { step: 'preview', label: 'Preview' },
  { step: 'checkout', label: 'Checkout (demo)' },
];
