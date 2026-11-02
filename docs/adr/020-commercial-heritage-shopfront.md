# ADR 020 — Commercial heritage shopfront: flat colour and sign-writing, no drawn textures

- **Status:** Accepted
- **Date:** 2026-11-01
- **Supersedes:** the atmosphere list of [ADR 019](019-storefront-atmosphere-plain-controls.md)
  (brick facade, scalloped awning, brick wall); its "controls stay plain" rule stays

## Context

With plain controls the editor still read as a game: tiled brick and a striped, scalloped awning
look like a game tileset, however carefully drawn. Commercial brands with a heritage-shop identity
never paint the bricks; they use flat colour blocks, sign-written lettering and one confident accent.

## Decision

- **The fascia (header, 56px):** flat Shop Green. The wordmark is sign-written on it: the brick-B
  mark and "Bottega" in the serif, a brass hairline divider, and "PRINT HOUSE" in brass small caps.
  The canvas name with undo/redo, the save status and Export sit on it as plain controls.
- **Under the fascia:** a 1px brass rule, then a 4px solid Brick Red band, where an awning would be.
- **The workspace:** flat Warm Sand; the page is the hero (warm grained paper, soft shadow).
- **No drawn textures in the chrome:** no tiled brick, no stripes, no scallops. The bodega is
  carried by colour (deli green, brick red, brass), lettering and the brick-B mark.
- Rail, dock and inspector stay as ADR 018 describes.

## Consequences

- The `brick-facade`, `brick-wall` and `awning` utilities are removed again.
- Paper grain on the page is the only texture anywhere.
