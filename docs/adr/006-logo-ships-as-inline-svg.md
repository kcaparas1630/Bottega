# ADR 006 — The logo ships as inline SVG, not WebP

- **Status:** Accepted
- **Date:** 2026-11-01

## Context

Two logo files were provided: `bottega-logo-minimal.svg` (654 bytes) and
`bottega-logo-minimal.webp` (26,002 bytes, 1920 × 1280). We need the mark in the header (every
page load) and as the favicon.

## Decision

Use **SVG**, inlined as a React component (`web/shared/ui/brand-mark.tsx`) and as the Next.js
file-convention icon (`web/app/icon.svg`).

|           | SVG (inline)                      | WebP                               |
| --------- | --------------------------------- | ---------------------------------- |
| Bytes     | ~0.4 KB of paths, inside the HTML | 26 KB, separate request            |
| Requests  | 0                                 | 1                                  |
| Sharpness | Crisp at every size and DPR       | Fixed raster; blurs when scaled up |
| Colour    | `fill="currentColor"`, themable   | Baked in                           |

Details:

- The mark was **traced from the WebP**, because the provided SVG's mark (three identical rounded
  bars) did not match the logo artwork. The WebP's bricks resolve exactly to three circular arcs
  (radii 105 and 165 at 1920 × 1280), so the traced paths are exact rather than approximate.
- The SVG's background rectangle was dropped so the mark sits on any surface.
- The wordmark is live text in Fraunces rather than an SVG `<text>` element, which would depend on
  the visitor's installed fonts (the provided file used Georgia).

## Consequences

- The logo costs no network request and never blurs.
- If the brand team supplies a final vector, replace the three `<path>` elements in
  `brand-mark.tsx` and `app/icon.svg`.
