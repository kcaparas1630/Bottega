# ADR 011 — Pin ESLint 9 and TypeScript 6.0

- **Status:** Accepted
- **Date:** 2026-11-01

## Context

At the time of writing, the latest releases are ESLint 10.14 and TypeScript 7.0 (the native
port). Our linting depends on:

- `typescript-eslint` 8.72, which declares `typescript >=4.8.4 <6.1.0`;
- `eslint-config-next` 16.4, whose plugins (`eslint-plugin-react`, `eslint-plugin-import`,
  `eslint-plugin-jsx-a11y`) declare support up to ESLint 9.

## Decision

Pin `eslint@^9.39` and `typescript@~6.0.3` in every package.

## Consequences

- Typed linting (`projectService`) and the Next.js rules work without peer-dependency overrides.
- Revisit when `typescript-eslint` supports TypeScript 7 and the Next.js ESLint plugins support
  ESLint 10; upgrading is a new ADR.
