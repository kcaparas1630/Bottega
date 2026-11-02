import { BRAND_MARK_PATHS, BRAND_MARK_SIZE } from '@/shared/config/brand-mark-paths';
import { bodyFont, displayFont } from '@/shared/config/fonts';

const PIXELS_PER_INCH = 120;
const CARD_INCHES = { width: 5, height: 7 };
const INK = 'rgb(42 35 32 / 0.62)';
const MARK_INCHES = 0.26;

// The back of the card, signed the way a print shop would: the brick-B, "Bottega" and "Print house".
export function paintCardBack(paperHex: string) {
  const canvas = document.createElement('canvas');
  canvas.width = CARD_INCHES.width * PIXELS_PER_INCH;
  canvas.height = CARD_INCHES.height * PIXELS_PER_INCH;
  const context = canvas.getContext('2d');
  if (!context) return canvas;
  const centerX = canvas.width / 2;
  context.fillStyle = paperHex;
  context.fillRect(0, 0, canvas.width, canvas.height);
  const markPixels = MARK_INCHES * PIXELS_PER_INCH;
  context.save();
  context.translate(centerX - markPixels / 2, 5.55 * PIXELS_PER_INCH);
  context.scale(markPixels / BRAND_MARK_SIZE, markPixels / BRAND_MARK_SIZE);
  context.fillStyle = INK;
  for (const path of BRAND_MARK_PATHS) context.fill(new Path2D(path));
  context.restore();
  context.fillStyle = INK;
  context.textAlign = 'center';
  context.font = `500 ${0.2 * PIXELS_PER_INCH}px ${displayFont.style.fontFamily}`;
  context.fillText('Bottega', centerX, 6.12 * PIXELS_PER_INCH);
  context.font = `600 ${0.075 * PIXELS_PER_INCH}px ${bodyFont.style.fontFamily}`;
  context.letterSpacing = `${0.018 * PIXELS_PER_INCH}px`;
  context.fillText('PRINT HOUSE', centerX, 6.3 * PIXELS_PER_INCH);
  return canvas;
}
