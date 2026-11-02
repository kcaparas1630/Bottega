import { BRAND_MARK_PATHS, BRAND_MARK_SIZE } from '@/shared/config/brand-mark-paths';
import { cn } from '@/shared/lib/cn';

type BrandMarkProps = {
  className?: string;
  label?: string;
};

// The three-brick B, inlined so the logo costs no request; decorative unless given a label.
export function BrandMark({ className, label }: BrandMarkProps) {
  return (
    <svg
      viewBox={`0 0 ${BRAND_MARK_SIZE} ${BRAND_MARK_SIZE}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={!label}
      fill="currentColor"
      className={cn('shrink-0', className)}
    >
      {BRAND_MARK_PATHS.map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}
