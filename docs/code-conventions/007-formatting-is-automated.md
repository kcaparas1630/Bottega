# 007 — Formatting is automated

Nobody formats by hand and nobody debates formatting in review.

## Rules

1. Prettier owns formatting (`.prettierrc.json`): single quotes, semicolons, trailing commas,
   100-column lines.
2. Tailwind classes are sorted by `prettier-plugin-tailwindcss`, including inside `cn()` and
   `cva()`.
3. Type-only imports use `import type` / `type` specifiers.

## Enforced by

| Check                                                        | Covers                    |
| ------------------------------------------------------------ | ------------------------- |
| `prettier --write` on staged files (lint-staged, pre-commit) | rules 1–2                 |
| `bun run format:check` (in `bun run verify`)                 | rules 1–2 across the repo |
| ESLint `@typescript-eslint/consistent-type-imports`          | rule 3                    |
