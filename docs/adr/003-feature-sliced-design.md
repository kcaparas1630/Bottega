# ADR 003 — Feature-Sliced Design for the web package

- **Status:** Accepted
- **Date:** 2026-11-01

## Context

An editor grows sideways quickly: canvas tools, the photo shelf, the assistant, export. Without
explicit boundaries, components start importing each other and business logic leaks into UI.
We want a structure where the direction of every import is predictable.

## Decision

`web/` is organised in layers. A layer may import only from the layers below it.

| Layer         | What it is                                                                                                             | May import from                                 |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `app/`        | Next.js routes and layouts. Pages compose widgets.                                                                     | widgets, features, entities, shared, components |
| `widgets/`    | A composition of features. **No business logic.** Cannot import another widget.                                        | features, shared, components                    |
| `features/`   | Business logic + component snippets: a user-facing capability. Cannot import another feature.                          | entities, shared, components                    |
| `entities/`   | **The business logic.** Wraps tRPC procedures as hooks and owns client state. **No UI.** Cannot import another entity. | shared                                          |
| `shared/`     | Business-agnostic code used by many: tRPC client, config, styles, small UI, helpers.                                   | shared, components                              |
| `components/` | shadcn/ui primitives (generated, see ADR 004). Part of the shared tier.                                                | shared, components                              |

### Slices and segments

`widgets`, `features` and `entities` are split into **slices** (one folder per capability or
domain). Inside its own slice a file may import siblings with relative paths; across slices only
the slice's public `index.ts` is importable, through the `@/` alias.

```
web/
  app/                      routes: layout.tsx, page.tsx, api/trpc/[trpc]/route.ts
  widgets/<slice>/
    components/             composition only
    index.ts                public API
  features/<slice>/
    components/             UI snippets that call entity hooks
    lib/                    logic shared by several files in the slice
    index.ts
  entities/<slice>/
    api/index.ts            every tRPC hook of the slice, one line each
    model/                  types and client state (Zustand)
    lib/                    pure business helpers
    index.ts
  shared/
    api/  config/  lib/  styles/  ui/
  components/ui/            shadcn
```

- **Entity API:** all of a slice's tRPC hooks live together in `entities/<slice>/api/index.ts`:

  ```ts
  import { api } from '@/shared/api/trpc-react';

  export const useGetCanvas = api.canvas.get.useQuery;
  export const useSaveCanvas = api.canvas.save.useMutation;
  ```

  It is the only `index.ts` allowed to define code; every other `index.ts` only re-exports.

- **Restricted imports:** only entities (and `app`) may import `@/shared/api`; only entities may
  import `zustand`; `@tanstack/react-query` stays in `shared` and `entities`; types from
  `@bottega/server` reach features through entities.
- **Cross-slice needs are solved by composition, not imports.** Example: the export dialog
  (feature `export-design`) needs a picture of the design (feature `canvas-stage`). The
  `editor-header` widget passes `renderDesign={(width) => <CanvasSnapshot width={width} />}` into
  `ExportDesign`, so neither feature imports the other.

## Consequences

- Boundaries are enforced by `bottega/feature-sliced-boundaries` (ESLint) and
  `check-slice-structure` / `check-public-api-files` (scripts). See convention 005.
- Entities contain no `.tsx` files; widgets contain only `components/`.
- Slightly more files than a flat structure, in exchange for a dependency graph that only points
  down.
