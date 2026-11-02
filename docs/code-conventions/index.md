# Code conventions

Every convention here is enforced by a machine before code is committed (see
[ADR 010](../adr/010-conventions-enforced-at-commit.md)). If a rule is in this folder, there is an
ESLint rule or a script that fails when it is broken.

| #   | Convention                                                                                             | Enforced by                                                                                    |
| --- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| 001 | [Names say what things are and do](001-clear-names.md)                                                 | `@typescript-eslint/naming-convention`, `id-length`, script `check-path-naming`                |
| 002 | [Comments are one clear line, or nothing](002-one-line-comments.md)                                    | `bottega/one-line-comments`, `bottega/no-filler-comments`                                      |
| 003 | [One responsibility per file](003-one-responsibility-per-file.md)                                      | `react/no-multi-comp`, `max-lines`, `max-lines-per-function`                                   |
| 004 | [Imports flow down into sub-folders, or into a shared folder](004-imports-flow-down-or-into-shared.md) | `bottega/no-sibling-imports`, script `check-shared-modules`                                    |
| 005 | [Feature-sliced layers and slices](005-feature-sliced-layers.md)                                       | `bottega/feature-sliced-boundaries`, scripts `check-slice-structure`, `check-public-api-files` |
| 006 | [Server code stays on the server](006-server-code-stays-on-the-server.md)                              | `bottega/server-boundary`, `@typescript-eslint/no-import-type-side-effects`                    |
| 007 | [Formatting is automated](007-formatting-is-automated.md)                                              | Prettier, `@typescript-eslint/consistent-type-imports`                                         |
| 008 | [Hooks live in hooks folders](008-hooks-live-in-hooks-folders.md)                                      | `bottega/hooks-in-hooks-folder`, script `check-hook-placement`                                 |
| 009 | [Interactive UI is built from shadcn primitives](009-ui-is-built-from-shadcn-primitives.md)            | `react/forbid-elements`, `no-restricted-imports`, script `check-ui-primitives`                 |

## Where the enforcement lives

```
eslint.config.ts                       wires every ESLint rule above
scripts/
  eslint-plugin-bottega/rules/         the bottega/* ESLint rules
  conventions/check-conventions.ts     runs every script check (bun run check:conventions)
  conventions/checks/                  one file per script check
  shared/project-layout.ts             layers, segments, shared folders, restricted imports
.husky/pre-commit                      lint-staged → check:conventions → typecheck
```

## Commands

| Command                     | What it does                                |
| --------------------------- | ------------------------------------------- |
| `bun run lint`              | ESLint over the repo, zero warnings allowed |
| `bun run check:conventions` | Whole-tree script checks                    |
| `bun run typecheck`         | `tsc` for scripts, server and web           |
| `bun run verify`            | Format check + all of the above             |

## Adding a convention

1. Write `NNN-short-title.md` here: the rule, examples, exceptions, and an **Enforced by** table.
2. Add or configure the ESLint rule (`scripts/eslint-plugin-bottega/rules/`) or the script check
   (`scripts/conventions/checks/`). Map a new `bottega/*` rule to its document in
   `scripts/eslint-plugin-bottega/shared/create-rule.ts`.
3. Add a row to the table above.
