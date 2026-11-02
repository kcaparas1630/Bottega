import type Anthropic from '@anthropic-ai/sdk';

import { activePhotoLibrary } from '../photo-library/active-photo-library';
import { PHOTO_SOURCES, type LibraryPhoto } from '../photo-library/library-photo';
import { askShopkeeperModel } from './ask-shopkeeper-model';
import { readConversation, recordExchange } from './conversation-store';
import type { ShopkeeperQuestion, ShopkeeperReply } from './shopkeeper-conversation';
import { MAX_PHOTO_SUGGESTIONS } from './shopkeeper-design-schema';
import { toCanvasDesign, toShopkeeperDesign } from './shopkeeper-design-view';
import { buildShopkeeperInstructions } from './shopkeeper-instructions';

const UNCLEAR_REPLY: ShopkeeperReply = {
  reply: "I couldn't quite work that one out. Could you put it another way?",
  suggestions: [],
  design: null,
};

async function listLibraryPhotos() {
  const photosBySource = await Promise.all(
    PHOTO_SOURCES.map((source) => activePhotoLibrary.listPhotos(source)),
  );
  return photosBySource.flat();
}

function pickSuggestions(photoIds: readonly string[], libraryPhotos: readonly LibraryPhoto[]) {
  return photoIds
    .map((photoId) => libraryPhotos.find((photo) => photo.id === photoId))
    .filter((photo): photo is LibraryPhoto => photo !== undefined)
    .slice(0, MAX_PHOTO_SUGGESTIONS);
}

// Asks Claude with the paper as it is now; only a usable answer joins the conversation.
export async function askShopkeeper({
  message,
  design,
}: ShopkeeperQuestion): Promise<ShopkeeperReply> {
  const libraryPhotos = await listLibraryPhotos();
  const question: Anthropic.MessageParam = {
    role: 'user',
    content: [
      { type: 'text', text: `The paper right now:\n${JSON.stringify(toShopkeeperDesign(design))}` },
      { type: 'text', text: message },
    ],
  };
  const { modelMessages } = readConversation(design.id);
  const { turn, content } = await askShopkeeperModel(buildShopkeeperInstructions(libraryPhotos), [
    ...modelMessages,
    question,
  ]);
  if (!turn) return UNCLEAR_REPLY;

  const changedDesign = turn.design && toCanvasDesign(turn.design, design, libraryPhotos);
  if (turn.design && !changedDesign) return UNCLEAR_REPLY;
  const reply: ShopkeeperReply = {
    reply: turn.reply,
    suggestions: pickSuggestions(turn.suggestedPhotoIds, libraryPhotos),
    design: changedDesign,
  };
  recordExchange(design.id, {
    question,
    answer: { role: 'assistant', content },
    customerEntry: { text: message, suggestions: [] },
    shopkeeperEntry: { text: reply.reply, suggestions: reply.suggestions },
  });
  return reply;
}
