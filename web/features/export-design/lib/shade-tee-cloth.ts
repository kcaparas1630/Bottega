import { TEE_SIZE } from './tee-shape';

type SoftShadow = { x: number; y: number; radiusX: number; radiusY: number; strength: number };

// Where cloth falls into shade on a hung tee, in inches from the top-left: under the arms, below the collar, at the hem.
const SOFT_SHADOWS: readonly SoftShadow[] = [
  { x: 7.3, y: 11.8, radiusX: 2.4, radiusY: 4.5, strength: 0.2 },
  { x: 26.7, y: 11.8, radiusX: 2.4, radiusY: 4.5, strength: 0.2 },
  { x: 17, y: 3.6, radiusX: 4.2, radiusY: 1.1, strength: 0.1 },
  { x: 11.5, y: 27.5, radiusX: 3.5, radiusY: 2.2, strength: 0.08 },
  { x: 23, y: 26.5, radiusX: 3, radiusY: 2.6, strength: 0.07 },
];

function shadeEllipse(context: CanvasRenderingContext2D, shadow: SoftShadow) {
  context.save();
  context.translate(shadow.x, shadow.y);
  context.scale(shadow.radiusX, shadow.radiusY);
  const gradient = context.createRadialGradient(0, 0, 0, 0, 0, 1);
  gradient.addColorStop(0, `rgb(24 16 12 / ${shadow.strength})`);
  gradient.addColorStop(1, 'rgb(24 16 12 / 0)');
  context.fillStyle = gradient;
  context.fillRect(-1, -1, 2, 2);
  context.restore();
}

// Shades the cloth and its print together, so the shirt reads as rounded fabric rather than a flat cut-out.
export function shadeTeeCloth(context: CanvasRenderingContext2D) {
  context.save();
  context.globalCompositeOperation = 'multiply';
  const across = context.createLinearGradient(6.5, 0, 27.5, 0);
  across.addColorStop(0, 'rgb(24 16 12 / 0.16)');
  across.addColorStop(0.22, 'rgb(24 16 12 / 0)');
  across.addColorStop(0.78, 'rgb(24 16 12 / 0)');
  across.addColorStop(1, 'rgb(24 16 12 / 0.2)');
  context.fillStyle = across;
  context.fillRect(0, 0, TEE_SIZE.width, TEE_SIZE.height);
  for (const shadow of SOFT_SHADOWS) shadeEllipse(context, shadow);
  context.restore();
}
