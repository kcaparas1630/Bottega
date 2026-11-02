// True when the browser can draw the 3D stage; three.js needs WebGL 2.
export function detectWebGl() {
  try {
    return Boolean(document.createElement('canvas').getContext('webgl2'));
  } catch {
    return false;
  }
}
