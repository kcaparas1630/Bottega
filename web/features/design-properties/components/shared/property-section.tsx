import type { ReactNode } from 'react';

type PropertySectionProps = {
  title: string;
  children: ReactNode;
  // Optional control at the right end of the title row, such as a reset.
  action?: ReactNode;
};

// One block of the order pad: a stamped heading, separated from the next by a perforation.
export function PropertySection({ title, children, action }: PropertySectionProps) {
  return (
    <section className="flex flex-col gap-3.5 border-b border-brick-ink/12 px-5 py-5">
      <header className="flex min-h-5 items-center justify-between gap-2">
        <h3 className="label-caps text-brick-ink/70">{title}</h3>
        {action}
      </header>
      {children}
    </section>
  );
}
