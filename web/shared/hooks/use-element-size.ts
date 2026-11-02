import { useEffect, useState } from 'react';

export type ElementSize = { width: number; height: number };

// Tracks an element's rendered size; attach the returned callback as its ref.
export function useElementSize() {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });

  useEffect(() => {
    if (!element) return;
    const resizeObserver = new ResizeObserver(([entry]) => {
      if (entry) setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [element]);

  return { measureRef: setElement, size };
}
