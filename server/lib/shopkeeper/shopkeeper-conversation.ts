import type { LibraryPhoto } from '../photo-library/library-photo';

export type CanvasSummary = {
  imageCount: number;
  textCount: number;
};

export type ShopkeeperQuestion = {
  message: string;
  canvasSummary: CanvasSummary;
};

export type ShopkeeperReply = {
  reply: string;
  suggestions: LibraryPhoto[];
};
