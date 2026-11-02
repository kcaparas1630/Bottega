import { BrandMark } from './brand-mark';

// The name sign-written straight onto the fascia: brass mark, cream serif, brass small caps.
export function ShopSign() {
  return (
    <span className="inline-flex shrink-0 items-center gap-3 text-mortar-cream">
      <BrandMark className="size-5 text-mustard" />
      <span className="font-serif-display text-2xl leading-none font-medium tracking-[0.01em]">
        Bottega
      </span>
      <span aria-hidden className="h-5 w-px bg-mustard/50" />
      <span className="label-caps tracking-[0.18em] text-mustard">Print house</span>
    </span>
  );
}
