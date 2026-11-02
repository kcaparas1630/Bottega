# ADR 016 — A professional finish: the bodega as an established shop, not a cartoon

- **Status:** Superseded by [ADR 018](018-experiment-neutral-professional-chrome.md)
- **Date:** 2026-11-01
- **Supersedes:** the "Type", "Surfaces and depth" and "Copy" sections of
  [ADR 015](015-bodega-storefront-direction.md); its surface mapping stays

## Context

ADR 015 gave Bottega a real identity, but the playful finish — tilted tags and prints, pushpins,
scalloped awning, a swinging door sign, hard offset ink shadows, thick ink outlines, a quirky mono
and Fraunces' "wonky" letterforms — reads as a personal project. Bottega sells print products to
people who want to feel their work is in professional hands. The shop should feel established:
a heritage storefront and a serious print house, not a cartoon.

## Decision

Keep the storefront, the wall, the counter, the shelf and the order pad. Change the finish.

### Type

- **Fraunces in its sober cut** (`SOFT 0`, `WONK 0`, high optical size) for the sign, headings and
  names — utility `font-serif-display`. The soft, wonky setting stays only as a choice for text on
  a design, never in the interface.
- **Instrument Sans** for everything else. Labels are small letter-spaced capitals
  (`label-caps`: 12px, 600, 0.12em); numbers use tabular figures.
- Space Mono is dropped.

### Surfaces and depth

- Hairline borders (`border-brick-ink/12`–`/25`) and soft shadows (`shadow-hairline`,
  `shadow-raised`, `shadow-float`); no hard offset shadows, no 2px ink outlines.
- No rotations, pins, strings, scallops or bounce. Motion is limited to short fades and lifts.
- The chosen option is filled in Brick Ink; brass (Mustard) is reserved for one thin accent rule
  per area (current aisle, active tab, the sign's pinstripe).
- The facade keeps its brick, behind a deep-green fascia board with a brass pinstripe; the awning
  becomes a straight, narrow striped valance.
- The save status is an enamel plaque on the facade: "Open" with "All changes saved" beneath.
- The add bar is a dark counter with line icons and small-caps labels.
- Prints on the shelf sit straight in a white mat.

### Copy

Title case, calm and direct: "The Shelf", "Type", "Shapes", "All changes saved". Shop vocabulary
where it helps orientation, never as a joke.

## Consequences

- `pressable` becomes a quiet bordered control; `label-stamp`, `font-hand-lettered` in the
  interface, the hard shadows and the scalloped awning are removed.
- One fewer web font to load.
