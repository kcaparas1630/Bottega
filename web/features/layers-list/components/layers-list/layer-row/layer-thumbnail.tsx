import Image from 'next/image';

import { fontFamilyStyle, SHAPE_BORDER_RADIUS, type CanvasElement } from '@/entities/canvas';

// A tiny likeness of the element: the photo, "Aa" in the text's own font and ink, or the shape in its fill.
export function LayerThumbnail({ element }: { element: CanvasElement }) {
  if (element.kind === 'image') {
    return <Image src={element.photoUrl} alt="" fill sizes="36px" className="object-cover" />;
  }
  if (element.kind === 'text') {
    return (
      <span
        className="text-base leading-none"
        style={{ ...fontFamilyStyle(element.fontFamily, element.fontWeight), color: element.color }}
      >
        Aa
      </span>
    );
  }
  return (
    <span
      className="block size-5"
      style={{
        backgroundColor: element.fill,
        borderRadius: element.shape === 'rounded' ? '4px' : SHAPE_BORDER_RADIUS[element.shape],
      }}
    />
  );
}
