# 004 — Imports flow down into sub-folders, or into a shared folder

Folders group files with one clear responsibility, and the folder tree mirrors who uses what.

## Rules

1. **A file never imports a sibling file.** If `a.tsx` needs `b.tsx`, then `b` is a private part
   of `a` and moves into a sub-folder — by convention one named after the importer:

   ```
   components/
     export-design.tsx             imports ./export-design/use-export-flow
     export-design/
       use-export-flow.ts
       product-step.tsx            imports ./product-step/product-tile
       product-step/
         product-tile.tsx
   ```

2. **A module used by two or more files lives in a shared folder** — a folder named `shared/`, `lib/` or
   `hooks/` at the nearest common parent of its importers. Files inside a shared folder may import
   each other.

   ```
   features/design-properties/components/
     design-properties/
       page-setup.tsx              imports ../shared/color-swatches
       element-properties/
         text-style-section.tsx    imports ../../shared/color-swatches
     shared/
       color-swatches.tsx
   ```

3. Relative imports therefore only ever point **down** (into your own sub-folders) or **into a
   `shared/`/`lib/` folder**. Anything else goes through a public `index.ts` (convention 005).

## Shared folders

- Any folder named `shared`, `lib` or `hooks`, at any depth (`web/shared`, `server/lib`,
  `features/<slice>/lib`, `features/<slice>/hooks`, `components/shared`, `scripts/shared`).
- `web/components/` — shadcn primitives (ADR 004).

## Exceptions

- `index.ts` is a folder's public API and may re-export its own files.
- `index.ts` files are not counted as importers for rule 2.

## Enforced by

| Check                                                       | Covers                                                                                                               |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| ESLint `bottega/no-sibling-imports`                         | rules 1 and 3: sibling imports and imports that go up or sideways into a non-shared folder (relative and `@/` paths) |
| Script `check-shared-modules` (`bun run check:conventions`) | rule 2: any non-shared module imported by two or more files                                                          |
