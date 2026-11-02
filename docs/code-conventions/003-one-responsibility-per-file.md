# 003 — One responsibility per file

A file does one job. If it does two, split it — and place the parts according to
convention 004.

## Rules

1. One React component per file.
2. A file has at most **150** lines of code (blank lines and comments not counted).
3. A function has at most **80** lines of code. A component that outgrows this is composing
   several things; extract them.
4. A hook file holds one hook; a component file holds one component and may export small
   types for its props.

Heuristic before splitting: can you name the file without "and"? `product-step.tsx` is one job;
`product-step-and-pricing.tsx` is two.

## Exceptions

- `web/components/ui/**`: shadcn primitives are compound components (`Dialog`, `DialogContent`,
  `DialogTitle`, …) generated as one file each. See ADR 004.
- JSON data (for example `server/lib/photo-library/placeholder-photos.json`) is data, not code.

## Enforced by

| Check                                | Covers                        |
| ------------------------------------ | ----------------------------- |
| ESLint `react/no-multi-comp`         | one component per `.tsx` file |
| ESLint `max-lines` (150)             | file size                     |
| ESLint `max-lines-per-function` (80) | function and component size   |
