# ADR 019 — The storefront is atmosphere; the controls stay plain

- **Status:** Accepted; the atmosphere list is superseded by
  [ADR 020](020-commercial-heritage-shopfront.md)
- **Date:** 2026-11-01
- **Supersedes:** "The bodega, in exactly three places" in
  [ADR 018](018-experiment-neutral-professional-chrome.md); the rest of ADR 018 (rail, dock,
  inspector, colour rules) stays

## Context

The bodega version ([ADR 017](017-storefront-character-with-a-serious-finish.md)) was liked for its
place — brick front, awning, sign, brick wall — but felt like a game, because its controls were
objects: hang-tag navigation, drawn goods on the counter, a sign hanging on strings, a mustard tab.
The neutral shell (ADR 018) fixed the controls but lost the place. Brand-led professional tools keep
atmosphere in the backdrop and keep every control plain.

## Decision

**Atmosphere (things you look at, never click):**

- The header is the storefront: the deep brick facade, the deli-green sign board with a brass
  pinstripe ("Bottega · Print house"), and the small scalloped awning beneath it.
- The workspace is the cream-washed brick wall.
- The page is warm grained paper with a soft shadow.

**Controls (things you click) stay plain, as in ADR 018:**

- Ink rail with the brick-B mark, line icons, Brick Red active item.
- Canvas name, undo/redo, save status and Export sit on cream cards and buttons with hairline
  borders on the facade; the save status is a dot and a line of text, not a sign.
- Standard dock with line icons; underlined inspector tabs; dense Design panel.

Still ruled out: control-objects (tags, hanging signs, drawn goods), rotations, pins, hard offset
shadows, thick ink outlines.

## Consequences

- The scene says "corner print shop"; the tools say "professional editor".
- The facade, wall and awning utilities return to `globals.css`; the 4px header strip is replaced by
  the awning.
