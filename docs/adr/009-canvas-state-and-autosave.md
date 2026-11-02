# ADR 009 — Canvas state in a Zustand entity store, autosaved over tRPC

- **Status:** Accepted
- **Date:** 2026-11-01

## Context

Dragging and resizing update the design on every pointer move. Round-tripping each change through
TanStack Query would be slow and noisy, yet the design must persist on the server.

## Decision

- The working copy of the design lives in `entities/canvas/model/canvas-store.ts`, a **Zustand**
  store with intent-named actions (`addPhoto`, `setElementFrame`, `styleText`, `removeElement`, …).
  Every edit bumps `editRevision`.
- The `canvas-sync` feature loads the design once with `useGetCanvas` and saves it with
  `useSaveCanvas` 800 ms after the last edit, showing "Saving…" / "Saved to the workbench".
- The design shape is the zod schema in `server/lib/canvas-design/canvas-design-schema.ts`; the
  client imports its inferred types. Elements are positioned in design units (a 1000 × 1000 sheet)
  and scaled for display, so the same data renders the editor, the snapshot and the export
  preview.
- Persistence is an in-memory `Map` pinned to `globalThis` (`design-repository.ts`) until a
  database is chosen.

## Consequences

- Designs reset when the server restarts; this is acceptable for the demo and is the next thing a
  database ADR should replace.
- Only entities import `zustand` (enforced by `bottega/feature-sliced-boundaries`).
