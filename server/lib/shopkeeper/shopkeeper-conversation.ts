import type { CanvasDesign } from '../canvas-design/canvas-design-schema';
import type { LibraryPhoto } from '../photo-library/library-photo';

export type ShopkeeperQuestion = {
  message: string;
  design: CanvasDesign;
};

export type ShopkeeperReply = {
  reply: string;
  suggestions: LibraryPhoto[];
  // The whole design after the shopkeeper's change, or null when the paper stays as it is.
  design: CanvasDesign | null;
};

export type ShopkeeperTranscriptEntry = {
  id: string;
  author: 'customer' | 'shopkeeper';
  text: string;
  suggestions: LibraryPhoto[];
};
