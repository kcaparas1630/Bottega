import { isHouseFont, type TextElement } from '@/entities/canvas';
import { useGoogleFonts } from '@/shared/hooks/use-google-fonts';

import { textElementStyle } from '../../../lib/text-element-style';

// Text may spill past its box rather than vanish when the type grows; its font loads on demand.
export function TextElementView({ element }: { element: TextElement }) {
  useGoogleFonts(
    isHouseFont(element.fontFamily)
      ? []
      : [{ family: element.fontFamily, weight: element.fontWeight }],
  );
  return (
    <p className="size-full break-words whitespace-pre-wrap" style={textElementStyle(element)}>
      {element.content}
    </p>
  );
}
