import { z } from 'zod';

import {
  canvasDesignSchema,
  imageElementSchema,
  MAX_DESIGN_ELEMENTS,
  shapeElementSchema,
  textElementSchema,
} from '../canvas-design/canvas-design-schema';

export const MAX_PHOTO_SUGGESTIONS = 4;

// A photo by its library id alone; the server fills in its URL, title and aspect ratio.
const shopkeeperImageSchema = imageElementSchema.omit({
  photoUrl: true,
  photoTitle: true,
  photoAspectRatio: true,
});

const shopkeeperElementSchema = z.discriminatedUnion('kind', [
  shopkeeperImageSchema,
  textElementSchema,
  shapeElementSchema,
]);

// The design as the shopkeeper reads and writes it: no design id, photos by id; see docs/adr/026.
export const shopkeeperDesignSchema = canvasDesignSchema.omit({ id: true }).extend({
  elements: z
    .array(shopkeeperElementSchema)
    .max(MAX_DESIGN_ELEMENTS)
    .describe('Every element on the paper, bottom of the stack first.'),
});

// The structured output of one shopkeeper turn.
export const shopkeeperTurnSchema = z.object({
  reply: z.string().describe('What you say to the customer: one to three short, warm sentences.'),
  design: shopkeeperDesignSchema
    .nullable()
    .describe('The whole design after your change, or null when the paper should stay as it is.'),
  suggestedPhotoIds: z
    .array(z.string())
    .max(MAX_PHOTO_SUGGESTIONS)
    .describe('Library photo ids to offer the customer, or an empty list.'),
});

export type ShopkeeperDesign = z.infer<typeof shopkeeperDesignSchema>;
export type ShopkeeperTurn = z.infer<typeof shopkeeperTurnSchema>;
