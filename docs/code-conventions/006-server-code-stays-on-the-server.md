# 006 — Server code stays on the server

`@bottega/server` contains routers, the in-memory design store and (later) API keys. None of it
may end up in the browser bundle, and the server must not depend on UI code.

## Rules

1. In `web/`, import `@bottega/server` with **`import type`** (or `export type … from`).
   Inline type specifiers (`import { type X }`) are not enough: they can leave a side-effect import
   behind.
2. Only `web/app/api/**` (the tRPC route handler) may import `@bottega/server` at runtime.
3. Files in `server/` never import from `web/` (no `@/` alias, no relative path into `web`).
4. `server/index.ts` imports `server-only` as a last line of defence.

```ts
// ✓ web/entities/canvas/index.ts
export type { CanvasDesign } from '@bottega/server';

// ✓ web/app/api/trpc/[trpc]/route.ts
import { appRouter } from '@bottega/server';

// ✗ web/features/export-design/...
import { PRINT_PRODUCTS } from '@bottega/server';
```

## Enforced by

| Check                                                           | Covers                                                   |
| --------------------------------------------------------------- | -------------------------------------------------------- |
| ESLint `bottega/server-boundary`                                | rules 1–3                                                |
| ESLint `bottega/feature-sliced-boundaries` (restricted imports) | only shared, entities and app may name `@bottega/server` |
| ESLint `@typescript-eslint/no-import-type-side-effects`         | rule 1's inline-specifier trap                           |
| `server-only` package at build time                             | rule 4                                                   |
