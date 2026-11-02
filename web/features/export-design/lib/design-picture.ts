// The design turned into a picture for the 3D products; it fails when fonts or photos cannot be read.
export type DesignPicture =
  { status: 'preparing' } | { status: 'ready'; canvas: HTMLCanvasElement } | { status: 'failed' };
