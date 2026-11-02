import { z } from 'zod';

export const IMAGE_FILTERS = ['none', 'warm', 'mono', 'faded'] as const;
export const IMAGE_CROPS = ['fill', 'fit'] as const;
export const TEXT_ALIGNS = ['left', 'center', 'right'] as const;
export const SHAPE_KINDS = ['rectangle', 'rounded', 'ellipse', 'arch'] as const;

export const MIN_ELEMENT_OPACITY = 0.1;
export const MAX_DESIGN_ELEMENTS = 100;

// Any colour, as #RRGGBB; see docs/adr/014.
const hexColorSchema = z.string().regex(/^#[0-9a-fA-F]{6}$/);
// A Google Fonts family name; letters, digits and spaces keep it safe in CSS and URLs.
const fontFamilySchema = z.string().regex(/^[A-Za-z0-9 ]{1,80}$/);

const elementFrameSchema = z.object({
  id: z.string().min(1),
  x: z.number(),
  y: z.number(),
  width: z.number().positive(),
  height: z.number().positive(),
  opacity: z.number().min(MIN_ELEMENT_OPACITY).max(1),
});

export const imageElementSchema = elementFrameSchema.extend({
  kind: z.literal('image'),
  photoId: z.string().min(1),
  photoUrl: z.url(),
  photoTitle: z.string(),
  photoAspectRatio: z.number().positive(),
  filter: z.enum(IMAGE_FILTERS),
  crop: z.enum(IMAGE_CROPS),
});

export const textElementSchema = elementFrameSchema.extend({
  kind: z.literal('text'),
  content: z.string().max(280),
  fontFamily: fontFamilySchema,
  fontWeight: z.number().int().min(100).max(900),
  fontSize: z.number().min(12).max(240),
  align: z.enum(TEXT_ALIGNS),
  color: hexColorSchema,
});

export const shapeElementSchema = elementFrameSchema.extend({
  kind: z.literal('shape'),
  shape: z.enum(SHAPE_KINDS),
  fill: hexColorSchema,
});

export const canvasElementSchema = z.discriminatedUnion('kind', [
  imageElementSchema,
  textElementSchema,
  shapeElementSchema,
]);

export const canvasDesignSchema = z.object({
  id: z.string().min(1).max(64),
  name: z.string().trim().min(1).max(80),
  width: z.number().positive(),
  height: z.number().positive(),
  paperColor: hexColorSchema,
  elements: z.array(canvasElementSchema).max(MAX_DESIGN_ELEMENTS),
});

export type CanvasDesign = z.infer<typeof canvasDesignSchema>;
export type CanvasElement = z.infer<typeof canvasElementSchema>;
export type ImageElement = z.infer<typeof imageElementSchema>;
export type TextElement = z.infer<typeof textElementSchema>;
export type ShapeElement = z.infer<typeof shapeElementSchema>;
export type ImageFilter = (typeof IMAGE_FILTERS)[number];
export type ImageCrop = (typeof IMAGE_CROPS)[number];
export type TextAlign = (typeof TEXT_ALIGNS)[number];
export type ShapeKind = (typeof SHAPE_KINDS)[number];
