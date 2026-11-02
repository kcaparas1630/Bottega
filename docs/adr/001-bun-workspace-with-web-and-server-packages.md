# ADR 001 — Bun workspace with `web` and `server` packages

- **Status:** Accepted
- **Date:** 2026-11-01

## Context

Bottega has a Next.js UI and a tRPC API. We want the API code physically separate from the UI so
that the browser bundle can never reach it by accident, while still sharing TypeScript types
end to end. We also want one fast tool for installing, running scripts and executing TypeScript.

## Decision

- The repository is a **Bun workspace** (`"workspaces": ["web", "server"]` in the root
  `package.json`, lockfile `bun.lock`).
- `web/` (`@bottega/web`) is the Next.js application.
- `server/` (`@bottega/server`) holds tRPC routers (`routers/`) and server-only logic (`lib/`).
  Its single entry point is `server/index.ts`, consumed by `web` as `@bottega/server`.
- Root-level `scripts/` holds the convention tooling (ESLint plugin and deterministic checks).
  Bun runs these TypeScript files directly (`bun scripts/...`), so no `tsx`/`ts-node`.
- `docs/` holds ADRs and code conventions.

```
Bottega/
  web/        Next.js app (feature-sliced, see ADR 003)
  server/     tRPC routers + server lib
  scripts/    ESLint plugin + convention checks
  docs/       adr/, code-conventions/
```

## Consequences

- `bun install` at the root installs every package; `bun run dev` starts the app.
- `web` lists `"@bottega/server": "workspace:*"` and Next transpiles it via `transpilePackages`.
- pnpm, npm and `tsx` are not used; adding them back requires a new ADR.
- Next.js itself still runs on Node.js through its CLI; Bun is the package manager and script
  runner, not the production runtime.
