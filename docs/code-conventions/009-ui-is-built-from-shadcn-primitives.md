# 009 — Interactive UI is built from shadcn primitives

Buttons, fields, toggles and menus come from `web/components/ui` (shadcn, see
[ADR 004](../adr/004-shadcn-and-tailwind-for-ui.md)), so focus rings, disabled states, keyboard
behaviour and accessibility attributes are the same everywhere. Bottega's look is applied on top
with `variant`, `size` and `className`.

## Rules

1. No raw `<button>`, `<input>`, `<textarea>` or `<select>` outside `web/components/ui/`. Use
   `Button`, `Input`, `Textarea`, `Toggle`, `ToggleGroup`/`ToggleGroupItem`, `Slider`, `Tabs`, …

   ```tsx
   // ✗
   <button type="button" className="…" onClick={undo}>…</button>
   // ✓
   <Button variant="ghost" size="icon" onClick={undo}>…</Button>
   ```

2. `radix-ui` is imported only inside `web/components/ui/`; everything else uses the shadcn
   wrapper around it.
3. When a primitive is missing, add it to `web/components/ui/` first (`bunx shadcn add …`, or by
   hand from the shadcn source with `cn` imported from `@/shared/lib/cn`), then use it.

## Exceptions

- Elements on the canvas page are `div role="button"`: they carry pointer dragging, which no
  primitive provides. They are not `<button>` elements and the rule does not apply.
- Third-party controls that render their own inputs (for example `react-colorful`'s
  `HexColorInput`) are components, not raw elements.

## Enforced by

| Check                          | Covers                                      |
| ------------------------------ | ------------------------------------------- |
| ESLint `react/forbid-elements` | raw `button`, `input`, `textarea`, `select` |
| ESLint `no-restricted-imports` | `radix-ui` outside `web/components/ui/`     |
| Script `check-ui-primitives`   | both of the above, across the whole tree    |
