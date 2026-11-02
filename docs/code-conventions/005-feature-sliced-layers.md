# 005 — Feature-sliced layers and slices

The architecture is described in [ADR 003](../adr/003-feature-sliced-design.md). These are the
rules a commit must satisfy.

## Rules

1. **Layers import downward only.**

   | Layer        | May import from                                 |
   | ------------ | ----------------------------------------------- |
   | `app`        | widgets, features, entities, shared, components |
   | `widgets`    | features, shared, components                    |
   | `features`   | entities, shared, components                    |
   | `entities`   | shared                                          |
   | `shared`     | shared, components                              |
   | `components` | shared, components                              |

2. **No cross-slice imports within a layer.** A widget never imports another widget, a feature
   another feature, an entity another entity. Compose them one layer up instead.
3. **Public API only.** Import another slice through its root: `@/entities/canvas`, never
   `@/entities/canvas/model/canvas-store`.
4. **Paths:** relative inside a slice; the `@/` alias across slices and layers.
5. **Restricted imports**

   | Import                  | Only from             | Why                                                      |
   | ----------------------- | --------------------- | -------------------------------------------------------- |
   | `@/shared/api`          | entities, app         | tRPC hooks are business logic                            |
   | `@trpc/*`               | shared, app           | the client is wired once; the handler lives in `app/api` |
   | `@tanstack/react-query` | shared, entities      | server state is owned by entities                        |
   | `zustand`               | entities              | client business state lives in entity models             |
   | `@bottega/server`       | shared, entities, app | server contracts reach the UI through entities           |

6. **Slice anatomy**
   - Every slice has an `index.ts`.
   - `widgets/<slice>/`: `components/`, `hooks/` — widgets have no business logic; hooks hold UI state only.
   - `features/<slice>/`: `components/`, `hooks/`, `lib/`.
   - `entities/<slice>/`: `api/`, `model/`, `lib/`. Entities contain no `.tsx` (no UI).
   - `shared/`: `api/`, `config/`, `hooks/`, `lib/`, `styles/`, `ui/`.
7. **`index.ts` only re-exports**, with one exception: `entities/<slice>/api/index.ts` defines all
   of the slice's tRPC hooks, one line each:

   ```ts
   import { api } from '@/shared/api/trpc-react';

   export const useGetCanvas = api.canvas.get.useQuery;
   export const useSaveCanvas = api.canvas.save.useMutation;
   ```

   Side-effect imports such as `import 'server-only';` are allowed in any `index.ts`.

## Enforced by

| Check                                      | Covers                                                                           |
| ------------------------------------------ | -------------------------------------------------------------------------------- |
| ESLint `bottega/feature-sliced-boundaries` | rules 1–5                                                                        |
| Script `check-slice-structure`             | rule 6, and that `web/` and `server/` contain only their known top-level folders |
| Script `check-public-api-files`            | rule 7                                                                           |
