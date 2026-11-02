import { cn } from '@/shared/lib/cn';

type BrandMarkProps = {
  className?: string;
  label?: string;
};

// The three-brick B, inlined so the logo costs no request; decorative unless given a label.
export function BrandMark({ className, label }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 574 574"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={!label}
      fill="currentColor"
      className={cn('shrink-0', className)}
    >
      <path d="M0 0H392A105 105 0 0 1 464.5 181H0Z" />
      <path d="M0 203H408A165 165 0 0 1 573 368V377H0Z" />
      <path d="M0 399H573V409A165 165 0 0 1 408 574H0Z" />
    </svg>
  );
}
