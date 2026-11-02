'use client';

import { useSelectedElement } from '@/entities/canvas';

import { ElementProperties } from './design-properties/element-properties';
import { PageSetup } from './design-properties/page-setup';

// The inspector's Design tab: the selected element's properties, or the page's when nothing is selected.
export function DesignProperties() {
  const selectedElement = useSelectedElement();
  return selectedElement ? (
    <ElementProperties key={selectedElement.id} element={selectedElement} />
  ) : (
    <PageSetup />
  );
}
