# ADR 013 — Canvas editing model: undo history, shapes, page sizes and element properties

- **Status:** Accepted; colour and typeface fields superseded by
  [ADR 014](014-open-colours-and-fonts-for-design-content.md)
- **Date:** 2026-11-01
- **Extends:** [ADR 009](009-canvas-state-and-autosave.md)

## Context

The inspector in [ADR 012](012-canva-style-editor-layout.md) promises what people expect from any
canvas: undo, duplicate, layer order, align to page, exact sizes, aspect ratios, opacity, and more
than photos and text. The design schema and the canvas store must grow to hold these.

## Decision

### Design schema (`server/lib/canvas-design/canvas-design-schema.ts`)

| Field              | On               | Meaning                                                                            |
| ------------------ | ---------------- | ---------------------------------------------------------------------------------- |
| `name`             | design           | Shown and edited in the top bar (1–80 characters)                                  |
| `width`, `height`  | design           | Page size in design units, from the page size presets                              |
| `opacity`          | every element    | 0.1–1                                                                              |
| `photoAspectRatio` | image            | The photo's own width ÷ height, for the "Original" ratio                           |
| `align`            | text             | `left` · `center` · `right`                                                        |
| `kind: 'shape'`    | new element kind | `shape` (`rectangle` · `rounded` · `ellipse` · `arch`) and `fill` (palette colour) |

Page size presets keep the short side at 1000 units: Square 1000 × 1000, Portrait 4:5
1000 × 1250, Card 5:7 1000 × 1400, Landscape 3:2 1500 × 1000. Elements keep their positions when
the page is resized.

### Canvas store (`entities/canvas/model/canvas-store.ts`)

- **History.** Every edit pushes the previous design onto `past` (capped at 100) and clears
  `future`; `undo` and `redo` swap designs between the stacks. Edits marked
  `pace: 'continuous'` — a drag, a resize, a slider sweep, a run of arrow-key nudges — merge with
  the previous step when they share a key (action + element + field) and arrive less than 1 s
  apart, so they undo in one go. Clicks and typed values are `'single'` and are always their own
  step. Loading a design clears history.
- **New actions.** `addText(preset)` (`heading` · `subheading` · `body`), `addShape`,
  `duplicateElement`, `moveElementInStack` (`front` · `forward` · `backward` · `back`),
  `styleShape`, `setElementOpacity`, `resizePage`, `renameDesign`, `undo`, `redo`.
- Every action still bumps `editRevision`, so autosave (ADR 009) covers undo and redo too.

### Shortcuts

Ctrl/⌘ + Z undo, Ctrl/⌘ + Shift + Z or Ctrl + Y redo, Ctrl/⌘ + D duplicate, Delete/Backspace
remove, arrows nudge (Shift = 10), Escape deselect. Shortcuts are ignored while typing in a field
or inside a dialog.

## Consequences

- Designs saved before this change are not migrated. A restart clears the in-memory store
  (ADR 009), but `bun run dev` keeps it alive across code changes, so a design stored under an
  older schema can outlive the schema. `design-repository.ts` therefore validates every stored
  design on read and replaces one that no longer matches with the starter design, rather than
  serving data that every save would reject. A database ADR must add real schema versioning. Since [ADR 024](024-new-canvas-starts-blank.md), such a design is
  treated as unsaved and the client starts blank.
- History lives only in the browser tab; it is not saved with the design.
- Alignment and aspect-ratio maths are pure functions in `features/design-properties/lib`, so
  they can be tested without the UI.
