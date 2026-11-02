# Bottega docs

Bottega (Italian for "artist's workshop") is a design canvas for print products — mugs, t-shirts,
greeting cards — built on licensed Stocksy photography, with a shopkeeper-style assistant that
helps pick photos and lay them out.

## Start here

| Folder                                           | What's in it                                                                    |
| ------------------------------------------------ | ------------------------------------------------------------------------------- |
| [`adr/`](adr/index.md)                           | Architecture Decision Records: why the stack and structure look the way they do |
| [`code-conventions/`](code-conventions/index.md) | The rules every commit must pass, and what enforces each one                    |

## Architecture in one picture

```
Browser ─────────────────────────────────────────────────────────────────────────┐
  web/app          page.tsx composes widgets                                      │
  web/widgets      app-rail · editor-header · canvas-workspace · inspector-panel    │
  web/features     canvas-stage · photo-shelf · add-text · add-shape ·             │
                   design-properties · layers-list · edit-history · rename-canvas · │
                   canvas-sync · ask-shopkeeper · export-design                    │
  web/entities     canvas · photo · product · order · shopkeeper  (tRPC hooks,     │
                   Zustand state — no UI)                                         │
  web/shared       tRPC client, tokens, fonts, brand UI   +  web/components/ui    │
──────────────────────────────── /api/trpc ──────────────────────────────────────┘
Next.js server
  web/app/api/trpc/[trpc]/route.ts  →  @bottega/server
  server/routers    app-router → canvas · photo · product · order · shopkeeper
  server/lib        zod schemas, design store, photo library, catalog, demo orders, shopkeeper
```

Layers import strictly downward; see [ADR 003](adr/003-feature-sliced-design.md). The screen
layout (app rail, floating add dock, properties inspector) is [ADR 012](adr/012-canva-style-editor-layout.md).

## Running it

```sh
bun install
cp .env.example web/.env.local  # then set ANTHROPIC_API_KEY
bun run dev          # http://localhost:3000
bun run verify       # format, lint, convention checks, typecheck
```

The shopkeeper calls Claude ([ADR 026](adr/026-shopkeeper-edits-the-design-with-claude.md)).
Without `ANTHROPIC_API_KEY` everything else still works; the shopkeeper just apologises.

The pre-commit hook runs lint-staged, `bun run check:conventions` and `bun run typecheck`.

## Temporary stand-ins

- **Photos** come from a placeholder library until the Stocksy API is approved
  ([ADR 007](adr/007-placeholder-photo-library-until-stocksy.md)).
- **Designs** and **shopkeeper conversations** are stored in memory until a database is chosen
  ([ADR 009](adr/009-canvas-state-and-autosave.md), [ADR 026](adr/026-shopkeeper-edits-the-design-with-claude.md)).
- **Checkout** is a demo: no charge, nothing ships.
