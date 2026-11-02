# ADR 025 — The export is a proof: the design on real products, in real-time 3D

- **Status:** Proposed
- **Date:** 2026-11-01
- **Supersedes:** the flat product outlines of the export flow (the "Product preview" feature)

## Context

The export dialog showed blank product outlines in the picker and a flat outline with the design
pasted on it in the preview. It read like a wireframe, the design never appeared on the products
you choose between, and checkout and the receipt never showed the product at all. The export is
the moment a design becomes a thing, so it should carry the most "wow" in the app.

Three ways to get there were weighed:

- **CSS 3D**, prototyped: a mug body built from slices looked convincing, but the handle came out
  jagged, and a T-shirt cannot be modelled this way.
- **Print-on-demand mockup APIs** (Printful's Mockup Generator, Dynamic Mockups, Mediamodifier):
  photo-real still images, but not interactive, slow per image, and they need an account, an API
  key and a hosted design image, which breaks "no accounts needed" for self-hosters.
- **three.js in the browser**: free and open source, real lighting and shadows, and the design is
  used as a texture.

## Decision

- **Real-time 3D with `three` and `@react-three/fiber`**, loaded lazily with the export dialog. No
  drei: lighting comes from three's `RoomEnvironment` (no network), and drag-to-turn is our own.
- **The design becomes a picture in the browser** (`modern-screenshot`) from the same read-only
  snapshot the editor renders, then is cropped to each product's print area (cover, as before).
  This raster is also the first step towards real print files.
- **Products are built in code, with no model files.** The mug is a turned ceramic body with a
  tube handle and an accent colour inside and on the handle. The greeting card is two hinged panels
  standing open, with "Bottega · Print house" on the back. The T-shirt is a draped panel cut to a
  tee's shape, with the print following its folds.
- **One proof screen.** A large dialog with a Shop Green fascia band ("Take it to print" and the
  steps Proof · Checkout · Done), a stage on the left and an order panel on the right. The stage
  shows the chosen product in 3D throughout; the panel moves from options (product, colour, size,
  quantity, how the design fits the print area) to checkout to the receipt.
- **Controls stay plain** (ADR 019, ADR 020): product choice, swatches and sizes are ordinary
  controls. The stage is a flat Warm Sand backdrop. The realism lives only in the product render,
  which is content, not chrome.
- **The catalogue gains options:** each product lists colours (mug accent, shirt colour, card
  paper) and, for the T-shirt, sizes. Demo orders take the colour, size and quantity, and the total
  is the price times the quantity.

## Consequences

- The export chunk grows by three.js. It is fetched quietly once the editor has settled, so the proof
  opens straight into 3D; the product shows at once and the design fades onto it when its picture
  is ready.
- The picture copies every element's full computed style. The library's shortcut of skipping
  "default" styles read them from a hidden frame that differs between browsers, which once dropped a
  paragraph's zero margin and moved text. The paper grain is screen-only and is left out of it.
- WebGL is required for the 3D stage. Without it the stage shows the design flat.
- Making the design into a picture needs fonts and photos the browser can read across origins.
  Google Fonts and Next's same-origin image URLs work; the Stocksy integration must keep that true.
- The flat outline mockups (`product-mockups.ts`, `product-silhouette.tsx`) are removed.
