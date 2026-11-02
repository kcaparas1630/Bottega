import { cn } from '@/shared/lib/cn';

// Goods standing upright on the counter, one per thing you can add; drawn with plain boxes.
const GOODS_SHADOW = 'shadow-[0_1px_2px_rgb(0_0_0/0.45)]';

export const PHOTO_PRINTS = (
  <span className="relative block h-11 w-14">
    <span className={cn('absolute top-0 left-1 block h-9 w-8 bg-white p-[3px]', GOODS_SHADOW)}>
      <span className="block size-full bg-shop-green" />
    </span>
    <span className={cn('absolute top-1.5 right-1 block h-9 w-8 bg-white p-[3px]', GOODS_SHADOW)}>
      <span className="relative block size-full overflow-hidden bg-mustard">
        <span className="absolute top-1 right-1 size-2 rounded-full bg-brick-red" />
        <span className="absolute -bottom-2 -left-1 h-4 w-10 rounded-[50%] bg-shop-green" />
      </span>
    </span>
  </span>
);

export const LETTER_TILES = (
  <span className="flex h-11 w-14 items-end justify-center gap-1 pb-0.5">
    <span
      className={cn(
        'flex size-8 items-center justify-center rounded-[3px] bg-mortar-cream font-serif-display text-xl font-semibold text-brick-ink',
        GOODS_SHADOW,
      )}
    >
      A
    </span>
    <span
      className={cn(
        'flex size-6 items-center justify-center rounded-[3px] bg-mortar-cream font-serif-display text-base font-semibold text-brick-red',
        GOODS_SHADOW,
      )}
    >
      a
    </span>
  </span>
);

export const PAPER_SHAPES = (
  <span className="flex h-11 w-14 items-end justify-center gap-1 pb-0.5">
    <span className={cn('block h-9 w-5 rounded-t-full bg-shop-green', GOODS_SHADOW)} />
    <span className={cn('block size-6 rounded-full bg-clay', GOODS_SHADOW)} />
    <span className={cn('block size-4 bg-mustard', GOODS_SHADOW)} />
  </span>
);
