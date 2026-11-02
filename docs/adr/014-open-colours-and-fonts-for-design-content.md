# ADR 014 — Open colours and fonts for design content

- **Status:** Accepted
- **Date:** 2026-11-01
- **Supersedes:** the `color`, `fill`, `paperColor` and `typeface` rows of
  [ADR 013](013-canvas-editing-model.md)'s schema table
- **Clarifies:** [ADR 005](005-bricks-bodega-design-language.md) — the locked palette and the two
  typefaces govern Bottega's own interface, not what customers put on their designs

## Context

Text could only use the seven Bricks Bodega colours and two typefaces (Fraunces, Instrument Sans);
shapes and paper had the same seven colours. People expect any canvas tool to offer a full colour
picker and a large font library. The brand palette stays the right default, but it cannot be the
limit.

## Decision

### Colours

- Every colour in a design — text `color`, shape `fill`, page `paperColor` — is a hex string
  `#RRGGBB` (zod-validated), not a palette name.
- One colour control everywhere (`design-properties/components/shared/color-field.tsx`): a swatch
  and hex input that opens a picker with a saturation/hue area
  ([`react-colorful`](https://github.com/omgovich/react-colorful), 2.8 kB, no dependencies), the
  seven house colours as presets, and the colours already used in the design.

### Fonts

- A text element stores `fontFamily` (a Google Fonts family name, letters/digits/spaces only) and
  `fontWeight` (100–900).
- The catalogue is a snapshot of the public Google Fonts metadata
  (`https://fonts.google.com/metadata/fonts`), filtered to open-source, non-brand families with a
  Latin subset: 1,630 families with category, popularity rank and default weight, stored in
  `server/lib/font-catalog/google-fonts.json`. tRPC `font.list` searches it by name and category,
  most popular first.
- The font picker (search, category chips, "Bottega fonts" pinned first) previews each family in
  its own face, loading only the glyphs of its name (`text=` subsetting) so a page of results costs
  a few kilobytes.
- On the page, a text element's font is loaded from the Google Fonts CSS API on demand
  (`shared/lib/use-google-fonts.ts`), one stylesheet per family and weight, so a family the API rejects
  never blocks the others. Fraunces and Instrument Sans keep
  using the self-hosted `next/font` files and Fraunces keeps its soft, wonky axes.

## Consequences

- Designs can use any colour and any of 1,630 fonts; the house palette and fonts remain the
  defaults and the first suggestions.
- Browsers request fonts from `fonts.googleapis.com` / `fonts.gstatic.com` when a design uses
  them, which shares the viewer's IP with Google. Self-hosting through Fontsource is the follow-up
  if that becomes a concern.
- The catalogue snapshot ages; refreshing it means regenerating the JSON from the same endpoint.
- Print export must embed the chosen fonts; the demo export renders in the browser, so it already
  does.
