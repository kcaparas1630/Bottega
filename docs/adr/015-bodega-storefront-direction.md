# ADR 015 — The editor is a bodega: storefront, brick wall, counter and order pad

- **Status:** Superseded by [ADR 018](018-experiment-neutral-professional-chrome.md)
- **Date:** 2026-11-01
- **Supersedes:** the "Look" section of [ADR 012](012-canva-style-editor-layout.md) (its layout —
  app rail, floating add dock, inspector — stays)
- **Extends:** [ADR 005](005-bricks-bodega-design-language.md) — same locked palette, one added
  typeface, harder shadows

## Context

ADR 012 gave Bottega a familiar editor layout, but it looked like a generic copy of Canva with brick
colours: nothing in it could only be Bottega. The reference for the bar is
[kcaparas.dev](https://kcaparas.dev): one metaphor carried all the way (a wall of tilted, pinned
notes with hard ink shadows), characterful type (a display serif, a quirky grotesk, a mono for
labels), a voice in the copy, and one interactive toy. Bottega's metaphor is in its name: a
corner bodega, bricks and all.

## Decision

Keep the layout; dress every surface as part of the shop.

| Surface             | Becomes                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------- |
| Top bar             | **The storefront**: a red-brick facade with a painted "Bottega" sign and a striped, scalloped awning under it |
| Save status         | **The door sign**: a hanging sign that reads OPEN (saved), ONE SEC (saving) or CLOSED (save failed)           |
| Export              | **The register key**: Brick Red, hard ink shadow, presses down when clicked                                   |
| App rail            | **The aisles**: ink panel with price-tag nav items; unavailable aisles are "soon"                             |
| Workspace           | **The wall**: painted (cream-washed) brick, so colours on the page still read true; the page is pinned up     |
| Add dock            | **The counter**: an ink counter holding three tilted goods — photo prints, letter tiles, cut-paper shapes     |
| Photo shelf         | **The shelf**: prints in white borders, each with a price-tag credit                                          |
| Inspector           | **The order pad**: mono labels, perforated dividers, ink-bordered controls, mustard for the chosen option     |
| Selection quick bar | A small price tag hanging off the selection                                                                   |

### Type

- **Fraunces** (SOFT 100, WONK 1) at heavy weights for signage and headings.
- **Instrument Sans** for UI text and values.
- **Space Mono** (new) for labels, tags, prices, shortcuts and anything stamped or printed:
  uppercase with wide tracking for labels (`label-stamp`), normal case for values.

### Surfaces and depth

- Hard ink shadows (`shadow-hard`, `shadow-hard-sm`) on things you can press or pick up; the soft
  `shadow-paper` stays only for the pinned page.
- Small rotations (≤ 2°) on goods and tags, never on inputs or text you edit.
- Brick patterns are drawn as inline SVG backgrounds (`brick-facade`, `brick-wall`, `awning`), no
  image requests.
- Motion stays ease-out with no bounce; the door sign tilts and settles when the status changes.

### Copy

Shop voice, short and lowercase where it is the shop talking ("the shelf", "ring it up"); plain
words for controls.

## Consequences

- `globals.css` gains the facade, wall, awning and stamp utilities and the hard shadows; components
  use them instead of ad-hoc styles.
- Fonts: one more `next/font` family (Space Mono 400/700).
- The workspace is no longer a flat neutral; the wall is cream-washed and low-contrast so it does
  not tint the design, and the page keeps a clean edge and soft shadow.
- Every new surface must answer "what is this in the shop?" before it is built.
