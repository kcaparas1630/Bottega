import { useEffect, useState } from 'react';

import type { DesignPicture } from '../lib/design-picture';

const PHOTO_WAIT_MS = 6000;

// Always reports "no defaults", so every element keeps its full computed style in the picture.
class NoDefaultStyles extends Map<string, Map<string, unknown>> {
  override has() {
    return true;
  }
  override get() {
    return new Map<string, unknown>();
  }
}

function isPrinted(node: Node) {
  return !(node instanceof Element && node.hasAttribute('data-screen-only'));
}

async function waitForPhotos(node: HTMLElement) {
  const photosDecoded = Promise.all(
    [...node.querySelectorAll('img')].map((photo) => photo.decode().catch(() => undefined)),
  );
  await Promise.race([photosDecoded, new Promise((resolve) => setTimeout(resolve, PHOTO_WAIT_MS))]);
}

async function capturePicture(node: HTMLElement) {
  await document.fonts.ready;
  await waitForPhotos(node);
  const { createContext, destroyContext, domToCanvas } = await import('modern-screenshot');
  const context = await createContext(node, { scale: 1, filter: isPrinted });
  // The library skips styles it thinks are defaults, read from a hidden frame that can differ per browser.
  context.defaultComputedStyles = new NoDefaultStyles();
  try {
    return await domToCanvas(context);
  } finally {
    destroyContext(context);
  }
}

// Turns the hidden design snapshot into a picture once its fonts and photos load; attach the ref to it.
export function useDesignPicture(onPicture: (picture: DesignPicture) => void) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if (!node) return;
    let isCancelled = false;
    capturePicture(node).then(
      (canvas) => {
        if (!isCancelled) onPicture({ status: 'ready', canvas });
      },
      () => {
        if (!isCancelled) onPicture({ status: 'failed' });
      },
    );
    return () => {
      isCancelled = true;
    };
  }, [node, onPicture]);
  return setNode;
}
