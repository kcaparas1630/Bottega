# ADR 004 — shadcn/ui primitives styled with Tailwind CSS

- **Status:** Accepted
- **Date:** 2026-11-01

## Context

We need accessible primitives (dialog, tabs, slider, toggle group, tooltip, scroll area) that we
can restyle completely: the Bricks Bodega look (ADR 005) must not read as stock SaaS UI.

## Decision

- **shadcn/ui** (Radix-based, `new-york` style) generates primitives into `web/components/ui/`.
  We own that code and may edit it; it is regenerated with
  `bunx shadcn@latest add <name>` from `web/`.
- `web/components.json` points shadcn at our layout: CSS in `shared/styles/globals.css`, the
  `cn` helper at `@/shared/lib/cn`.
- **Tailwind CSS v4** via `@tailwindcss/postcss`. Design tokens are CSS variables in
  `globals.css`; palette colours are exposed as utilities (`bg-brick-red`, `text-shop-green`, …).
- Class order is normalised by `prettier-plugin-tailwindcss`.

## Consequences

- `web/components/ui/**` is treated as a shared folder and is exempt from
  `react/no-multi-comp`, `max-lines` and `max-lines-per-function`: shadcn primitives are compound
  components (`Dialog`, `DialogContent`, …) by design.
- When shadcn's CLI writes `from "cn"` (it can mis-resolve a custom `utils` alias), replace it with
  `@/shared/lib/cn` and remove any stray `cn` npm package it installed.

## Amendment (2026-11-01)

- Bottega is light-only. shadcn components carry `dark:` styles, and Tailwind applied them whenever
  the operating system was in dark mode. `globals.css` now declares
  `@custom-variant dark (&:is(.dark *));`, so `dark:` styles apply only under a `.dark` class, which
  the app never sets.
- Using the primitives is now a checked rule: see
  [convention 009](../code-conventions/009-ui-is-built-from-shadcn-primitives.md).
