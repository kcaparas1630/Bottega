import { shadeTeeCloth } from './shade-tee-cloth';
import {
  TEE_FRONT_NECKLINE,
  TEE_NECK_OPENING,
  TEE_OUTLINE,
  TEE_PRINT_AREA,
  TEE_SIZE,
  TEE_STITCH_LINES,
} from './tee-shape';

const TEE_PIXELS_PER_INCH = 48;

function createTeeCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = TEE_SIZE.width * TEE_PIXELS_PER_INCH;
  canvas.height = TEE_SIZE.height * TEE_PIXELS_PER_INCH;
  const context = canvas.getContext('2d');
  context?.scale(TEE_PIXELS_PER_INCH, TEE_PIXELS_PER_INCH);
  return { canvas, context };
}

// Paints the shirt's cloth, collar, stitching and shade onto a canvas; outside the outline stays clear.
export function paintTee(colorHex: string) {
  const { canvas, context } = createTeeCanvas();
  if (!context) return canvas;
  const outline = new Path2D(TEE_OUTLINE);
  context.fillStyle = colorHex;
  context.fill(outline);
  context.save();
  context.clip(outline);
  context.strokeStyle = 'rgb(0 0 0 / 0.1)';
  context.lineWidth = 0.95;
  context.stroke(new Path2D(TEE_FRONT_NECKLINE));
  context.fillStyle = 'rgb(20 12 8 / 0.32)';
  context.fill(new Path2D(TEE_NECK_OPENING));
  context.strokeStyle = 'rgb(0 0 0 / 0.16)';
  context.lineWidth = 0.05;
  context.setLineDash([0.14, 0.09]);
  for (const stitchLine of TEE_STITCH_LINES) context.stroke(new Path2D(stitchLine));
  shadeTeeCloth(context);
  context.restore();
  return canvas;
}

// Paints only the chest print, shaded like the cloth beneath it, on an otherwise clear canvas the same size.
export function paintTeePrint(print: HTMLCanvasElement) {
  const { canvas, context } = createTeeCanvas();
  if (!context) return canvas;
  const { x, y, width, height } = TEE_PRINT_AREA;
  context.drawImage(print, x, y, width, height);
  context.save();
  context.beginPath();
  context.rect(x, y, width, height);
  context.clip();
  shadeTeeCloth(context);
  context.restore();
  return canvas;
}
