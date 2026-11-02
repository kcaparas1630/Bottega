# 008 — Hooks live in hooks folders

A custom hook is logic, not markup. It sits in a `hooks/` folder next to the components that use
it, never inside `components/`.

## Rules

1. A custom hook — an exported function named `useSomething` — lives in a file named
   `use-something.ts` inside a `hooks/` folder:

   ```
   features/<slice>/hooks/use-stage-zoom.ts
   widgets/<slice>/hooks/use-….ts
   shared/hooks/use-element-size.ts
   ```

2. A `hooks/` folder holds only `use-*.ts` files, one hook each (convention 003).
3. Like `lib/`, a `hooks/` folder is shared within its slice: any file in the slice may import it
   with a relative path (convention 004).

## Exceptions

- `entities/<slice>/api/index.ts` defines the slice's tRPC hooks (convention 005).
- `entities/<slice>/model/` exports its Zustand store hook and selectors (`useCanvasStore`,
  `useSelectedElement`): the store is the model.
- `web/components/ui/**` is generated shadcn code (ADR 004).

## Enforced by

| Check                                  | Covers                                                        |
| -------------------------------------- | ------------------------------------------------------------- |
| ESLint `bottega/hooks-in-hooks-folder` | an exported `use…` function outside a `hooks/` folder         |
| Script `check-hook-placement`          | `use-*.ts` files outside `hooks/`; non-hook files in `hooks/` |
