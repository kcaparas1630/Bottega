# ADR 002 — Next.js App Router client and server, connected by tRPC

- **Status:** Accepted
- **Date:** 2026-11-01

## Context

The editor is highly interactive (drag, resize, live toolbars) and needs a typed API for photos,
products, demo orders, the shopkeeper assistant and design autosave. We want one deployable unit
and compile-time safety between client and server.

## Decision

- **Next.js 16 App Router** serves the UI (`web/app`) and hosts the API.
- The API is **tRPC v11**. `server/routers/app-router.ts` composes one router per domain
  (`canvas`, `photo`, `product`, `order`, `shopkeeper`) from `server/routers/domain-routers/`.
- The only place that executes server code is the route handler
  `web/app/api/trpc/[trpc]/route.ts`, which mounts `appRouter` with `fetchRequestHandler`.
- The client uses the classic React integration (`@trpc/react-query` + TanStack Query):
  `web/shared/api/trpc-react.ts` exports `api = createTRPCReact<AppRouter>()`.
- Entities turn procedures into named hooks, exactly one line each (see ADR 003):

  ```ts
  export const useGetCanvas = api.canvas.get.useQuery;
  export const useSaveCanvas = api.canvas.save.useMutation;
  ```

- Inputs are validated with **zod v4** schemas that live in `server/lib`, and domain types are
  inferred from those schemas, so the schema is the single source of truth.

## Consequences

- `web` imports `@bottega/server` with `import type` only, except the route handler
  (enforced by `bottega/server-boundary`, convention 006). `server/index.ts` imports
  `server-only`, so an accidental runtime import from client code fails the build.
- Renaming a procedure is a type error in every hook that uses it.
- Only entities may touch `api` from `@/shared/api` (enforced by
  `bottega/feature-sliced-boundaries`).
