# ADR 005 — "Bricks Bodega" design language

- **Status:** Accepted; the "Layout and feel" section and the Figma/Canva line under "Avoid" are
  superseded by [ADR 012](012-canva-style-editor-layout.md)
- **Date:** 2026-11-01

## Context

Bottega (Italian for "artist's workshop") is a design canvas for print products using licensed
Stocksy photography. Stocksy's brand is human-made, human-curated photography, so the app must
feel made by a person, not a template. Mood: _walking into a small art-supply shop where the owner
knows your name and the good paper is on the second shelf._

## Decision

### Palette (locked)

| Token        | Hex       | Use                                                    |
| ------------ | --------- | ------------------------------------------------------ |
| Mortar Cream | `#F5EDE1` | Canvas and main background                             |
| Brick Ink    | `#2A2320` | Text (warm near-black, never pure black)               |
| Brick Red    | `#A64B32` | Primary actions, Export, wordmark, active tool         |
| Clay         | `#C96F4A` | Secondary accents, selection outline                   |
| Shop Green   | `#2E4B3F` | Cool counterweight: focus rings, customer chat bubbles |
| Mustard      | `#E3A82B` | Small highlight moments only                           |
| Warm Sand    | `#E8DCC8` | Sidebars and subtle surfaces                           |

Brick is an accent, not the building: wordmark, Export and primary buttons, the active tool and one
thin brick strip under the header. The shell stays cream and sand so photos get a neutral stage.
No cold blues, slate greys or SaaS purple.

### Type

- Display and headings: **Fraunces** with `SOFT 100` and `WONK 1` (utility `font-hand-lettered`).
- UI labels and body: **Instrument Sans**. Headings may feel hand-lettered; UI text never does.

### Layout and feel

- The canvas is the hero: paper centred on a slightly darker table, photos do the talking.
- Left: the workbench (tools in a rail, icon over label) and the shelf (Stocksy imports and the
  customer's own photos).
- Right: a collapsible "Ask the shopkeeper" panel — conversational, never a chatbot popup.
- Top: contextual toolbar (text → typeface/size/ink, photo → filters/crop, nothing → paper tint);
  Export pinned top-right in Brick Red.
- Export is one modal with a stepper (pick a product → preview → demo checkout), editor visible
  behind a light Brick Ink scrim.
- Texture: paper grain (`paper-grain`), soft shadows (`shadow-paper`), hand-cut corners
  (`rounded-hand`). Motion: ease-out `ease-settle`, `animate-paper-settle`; never bounce or spring;
  honour `prefers-reduced-motion`.

### Avoid

Corporate SaaS chrome, gradient meshes, glassmorphism, neon accents, dense toolbars, anything that
looks like Figma or Canva.

## Consequences

- Every token lives in `web/shared/styles/globals.css`; components use tokens, never raw hex.
  The one exception is `shared/config/palette-colors.ts`, which maps the server's palette names
  to hex for inline styles on the canvas.
- New colours require amending this ADR.
