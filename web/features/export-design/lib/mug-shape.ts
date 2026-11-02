import { CatmullRomCurve3, Vector2, Vector3 } from 'three';

// An 11 oz mug in inches: 3.25 in across and 3.8 in tall, printed on a 3.25 × 3.5 in band at the front.
export const MUG_RADIUS = 1.625;
export const MUG_HEIGHT = 3.8;
export const MUG_PRINT_BAND = { height: 3.5, centerY: 1.94, arc: 3.25 / MUG_RADIUS };

function toProfile(points: readonly (readonly [number, number])[]) {
  return points.map(([radius, height]) => new Vector2(radius, height));
}

// Turned around the upright axis: the glazed outside from the foot over the lip.
export const MUG_OUTER_PROFILE = toProfile([
  [0, 0.02],
  [1.42, 0.02],
  [1.54, 0.05],
  [1.6, 0.12],
  [1.625, 0.24],
  [1.625, 3.7],
  [1.62, 3.76],
  [1.6, 3.792],
  [1.575, 3.8],
  [1.552, 3.794],
]);

// The inside, from the lip down to the floor of the cup; it takes the accent colour.
export const MUG_INNER_PROFILE = toProfile([
  [1.552, 3.794],
  [1.536, 3.77],
  [1.528, 3.7],
  [1.528, 0.5],
  [1.5, 0.36],
  [1.42, 0.3],
  [0, 0.28],
]);

// The handle's centre line, on the viewer's right, rooted inside the wall at both ends.
export const MUG_HANDLE_CURVE = new CatmullRomCurve3(
  [
    [1.45, 3.02],
    [2.12, 3.1],
    [2.6, 2.86],
    [2.8, 2.2],
    [2.7, 1.45],
    [2.28, 1.0],
    [1.45, 0.94],
  ].map(([x = 0, y = 0]) => new Vector3(x, y, 0)),
);
export const MUG_HANDLE_THICKNESS = 0.19;
