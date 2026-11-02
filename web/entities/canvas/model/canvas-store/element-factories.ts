import type {
  CanvasDesign,
  CanvasElement,
  ImageElement,
  ShapeElement,
  ShapeKind,
  TextElement,
} from '@bottega/server';

// The fields any photo source must provide to be placed on the paper.
export type PlaceablePhoto = {
  id: string;
  imageUrl: string;
  title: string;
  width: number;
  height: number;
};

export type PaperPoint = { x: number; y: number };
export type TextPresetName = 'heading' | 'subheading' | 'body';

type TextPreset = Pick<TextElement, 'content' | 'fontFamily' | 'fontSize' | 'height'> & {
  widthShare: number;
};

const NEW_PHOTO_WIDTH_SHARE = 0.5;
const NEW_SHAPE_SIZE = 320;
const DUPLICATE_OFFSET = 24;

const TEXT_PRESETS: Record<TextPresetName, TextPreset> = {
  heading: {
    content: 'Your headline',
    fontFamily: 'Fraunces',
    fontSize: 96,
    height: 120,
    widthShare: 0.8,
  },
  subheading: {
    content: 'A short subheading',
    fontFamily: 'Instrument Sans',
    fontSize: 48,
    height: 64,
    widthShare: 0.7,
  },
  body: {
    content: 'A little body text for the details.',
    fontFamily: 'Instrument Sans',
    fontSize: 28,
    height: 76,
    widthShare: 0.6,
  },
};

function createElementId(kind: string) {
  return `${kind}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function paperCenter(design: CanvasDesign): PaperPoint {
  return { x: design.width / 2, y: design.height / 2 };
}

function centredFrame(center: PaperPoint, width: number, height: number) {
  return {
    x: Math.round(center.x - width / 2),
    y: Math.round(center.y - height / 2),
    width: Math.round(width),
    height: Math.round(height),
  };
}

export function createImageElement(
  photo: PlaceablePhoto,
  design: CanvasDesign,
  center: PaperPoint = paperCenter(design),
): ImageElement {
  const photoAspectRatio = photo.width / photo.height;
  const width = design.width * NEW_PHOTO_WIDTH_SHARE;
  return {
    id: createElementId('image'),
    kind: 'image',
    ...centredFrame(center, width, width / photoAspectRatio),
    opacity: 1,
    photoId: photo.id,
    photoUrl: photo.imageUrl,
    photoTitle: photo.title,
    photoAspectRatio,
    filter: 'none',
    crop: 'fill',
  };
}

export function createTextElement(design: CanvasDesign, presetName: TextPresetName): TextElement {
  const { widthShare, height, ...textStyle } = TEXT_PRESETS[presetName];
  return {
    id: createElementId('text'),
    kind: 'text',
    ...centredFrame(paperCenter(design), design.width * widthShare, height),
    opacity: 1,
    ...textStyle,
    align: 'center',
    fontWeight: 400,
    color: '#2A2320',
  };
}

export function createShapeElement(design: CanvasDesign, shape: ShapeKind): ShapeElement {
  const height = shape === 'arch' ? NEW_SHAPE_SIZE * 1.25 : NEW_SHAPE_SIZE;
  return {
    id: createElementId('shape'),
    kind: 'shape',
    ...centredFrame(paperCenter(design), NEW_SHAPE_SIZE, height),
    opacity: 1,
    shape,
    fill: '#C96F4A',
  };
}

// A copy nudged down and right, so it is visibly a second one.
export function createElementCopy(element: CanvasElement): CanvasElement {
  return {
    ...element,
    id: createElementId(element.kind),
    x: element.x + DUPLICATE_OFFSET,
    y: element.y + DUPLICATE_OFFSET,
  };
}
