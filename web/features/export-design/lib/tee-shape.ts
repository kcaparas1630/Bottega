// A heavyweight tee laid out in inches from the top-left, y downwards, with a 12 × 16 in chest print.
export const TEE_SIZE = { width: 34, height: 30 };
export const TEE_PRINT_AREA = { x: 11, y: 4.3, width: 12, height: 16 };

// Back neckline, shoulders, sleeves, sides and hem.
export const TEE_OUTLINE =
  'M13.1 1.25C14.7 0.55 19.3 0.55 20.9 1.25L26.7 2.55C28.6 3.25 30.3 5.3 33.4 9.45L29.3 12.7C28.6 11.95 27.9 11.45 27.15 11.05C27 17 27.15 23.2 27.45 29.25C20.5 29.75 13.5 29.75 6.55 29.25C6.85 23.2 7 17 6.85 11.05C6.1 11.45 5.4 11.95 4.7 12.7L0.6 9.45C3.7 5.3 5.4 3.25 7.3 2.55Z';

// The inside of the back of the neck, seen above the front neckline.
export const TEE_NECK_OPENING =
  'M13.1 1.25C14.7 0.55 19.3 0.55 20.9 1.25C19.9 3.6 14.1 3.6 13.1 1.25Z';
export const TEE_FRONT_NECKLINE = 'M13.1 1.25C14.1 3.6 19.9 3.6 20.9 1.25';

// Twin-needle stitching at the hem and both sleeve cuffs.
export const TEE_STITCH_LINES = [
  'M6.62 28.5C13.5 28.98 20.5 28.98 27.38 28.5',
  'M6.6 28.75C13.5 29.23 20.5 29.23 27.4 28.75',
  'M1.35 9.0L5.2 12.05',
  'M32.65 9.0L28.8 12.05',
];

function softRidge(x: number, y: number, centerX: number, centerY: number, slope: number) {
  const across = x - centerX - slope * (y - centerY);
  return Math.exp(-((across / 2.1) ** 2)) * Math.exp(-(((y - centerY) / 6.5) ** 2));
}

// How far the cloth stands towards the viewer, in inches, at a point measured from the shirt's centre with y up.
export function measureTeeDrape(x: number, y: number) {
  const chest = 2.2 * Math.exp(-((x / 8) ** 2)) * (0.75 + 0.25 * Math.cos(y / 11));
  const sleeveFall = -0.45 * Math.max(0, Math.abs(x) - 8.5);
  const folds =
    0.75 * softRidge(x, y, -5.5, 2, 0.45) -
    0.6 * softRidge(x, y, 6, -4, -0.5) +
    0.55 * softRidge(x, y, 1.5, -11.5, 0.1) -
    0.45 * softRidge(x, y, -3, -12, -0.25) +
    0.4 * softRidge(x, y, 7.5, 8, 0.9);
  const hemWave = 0.35 * Math.sin(x * 0.55) * Math.exp(-(((y + 15) / 2.4) ** 2));
  return chest + sleeveFall + folds + hemWave;
}
