const MAX_TEXTURE_WIDTH = 2048;

// Crops the centre of a picture to an aspect ratio, the way the print area covers the design.
export function cropToAspect(picture: HTMLCanvasElement, aspect: number) {
  const isPictureWider = picture.width / picture.height > aspect;
  const cropWidth = isPictureWider ? picture.height * aspect : picture.width;
  const cropHeight = isPictureWider ? picture.height : picture.width / aspect;
  const scale = Math.min(1, MAX_TEXTURE_WIDTH / cropWidth);
  const cropped = document.createElement('canvas');
  cropped.width = Math.round(cropWidth * scale);
  cropped.height = Math.round(cropHeight * scale);
  cropped
    .getContext('2d')
    ?.drawImage(
      picture,
      (picture.width - cropWidth) / 2,
      (picture.height - cropHeight) / 2,
      cropWidth,
      cropHeight,
      0,
      0,
      cropped.width,
      cropped.height,
    );
  return cropped;
}
