# ADR 018 — Neutral, professional chrome; the design carries the colour

- **Status:** Accepted; "The bodega, in exactly three places" is superseded by
  [ADR 019](019-storefront-atmosphere-plain-controls.md). Supersedes the surfaces of ADRs 015–017 and the sizing rule of
  [ADR 012](012-canva-style-editor-layout.md).
- **Date:** 2026-11-01

## Context

ADRs 015–017 dressed the editor as a bodega (brick facade, awning, hang-tag aisles, counter goods).
It had character, but it competed with the customer's design and read as a storybook shop. Serious
print tools such as Figma and Canva keep their chrome quiet and dense, so the design on the page is
the only colourful thing on screen. Fully neutral, though, Bottega becomes generic; the bodega has
to survive somewhere, in a few disciplined places.

## Decision

### The shell

- **Surfaces:** flat Mortar Cream `#F5EDE1` for the shell (header, inspector, popovers, dock) and
  flat Warm Sand `#E8DCC8` for the workspace. No patterns in the chrome.
- **Brick Red** only on the wordmark, the Export button, the active nav item, the rail's logo mark
  and the strip under the header. Clay, Shop Green and Mustard appear only as small accents
  (selection frame, save-status dot).
- **Header** 48px: wordmark, canvas name, undo/redo, save status, Export pinned top-right.
- **Nav rail:** Brick Ink, 72px, rectangular items with an 8px radius at most, line icons, small
  labels.
- **Add dock:** a standard toolbar at the bottom of the workspace: small line icons with labels,
  hairline border, 8px radius.
- **Inspector:** Design / Layers / Shopkeeper, dense: 320px wide, 32px controls, 13px values, 11px
  uppercase labels, hairline borders, quiet white chips for the chosen option.

### The bodega, in exactly three places

1. **The brick strip:** one 4px Brick Red strip directly under the header, edge to edge.
2. **The ink stamp:** the rail carries the brick-B mark at its top, and the active section is Brick
   Red, so the rail reads as the shop's stamp rather than a generic sidebar.
3. **The paper:** the page is warm paper — Mortar Cream with a very subtle grain and a soft shadow,
   set in Fraunces — because the page is the product.

### Rules

No illustration, no repeating patterns, no awnings or hanging signs, no rounded cartoon shapes, no
extra colours, no rotations. If it looks like Canva it has gone too generic; if it looks like a game
it has gone too cartoon.

## Consequences

- The canvas content is the only expressive element on screen; warmth comes from the paper, the
  serif and the one strip.
- Any new bodega detail needs a change to this ADR, not just a component.
