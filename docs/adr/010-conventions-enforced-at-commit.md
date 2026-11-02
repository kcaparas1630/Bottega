# ADR 010 — Conventions are enforced by ESLint, scripts and a pre-commit hook

- **Status:** Accepted
- **Date:** 2026-11-01

## Context

Conventions that live only in documents drift. Every rule in `docs/code-conventions/` must be
checked by a machine before code reaches the repository.

## Decision

Each convention is enforced by at least one of:

1. **ESLint** (`eslint.config.ts`): built-in and typescript-eslint rules plus a local plugin,
   `scripts/eslint-plugin-bottega/`, with rules `one-line-comments`, `no-filler-comments`,
   `no-sibling-imports`, `feature-sliced-boundaries` and `server-boundary`. Per-file rules give
   instant feedback in the editor.
2. **Deterministic scripts** (`scripts/conventions/`), run with
   `bun run check:conventions`. They see the whole tree at once, so they handle what a per-file
   linter cannot: file and folder names (including non-code files), slice structure, `index.ts`
   contents and how many files import each module.
3. **Prettier** for formatting.

A **Husky** pre-commit hook (`.husky/pre-commit`) runs, in order:

```sh
bunx lint-staged            # prettier --write + eslint --max-warnings 0 on staged files
bun run check:conventions   # whole-tree structure checks
bun run typecheck           # tsc for scripts, server and web
```

`bun run verify` runs the same checks over the entire repository (useful in CI).

Every convention document ends with an **Enforced by** section naming its rules and checks, and
every rule links back to its document (`meta.docs.url`).

## Consequences

- Adding a convention means: write the document, add or configure the rule/check, list it in
  `docs/code-conventions/index.md`.
- A commit that breaks a convention is rejected locally with a message pointing at the document.
