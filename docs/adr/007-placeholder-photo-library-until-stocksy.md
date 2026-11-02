# ADR 007 — Placeholder photo library until the Stocksy API is approved

- **Status:** Accepted (temporary; superseded when Stocksy access is granted)
- **Date:** 2026-11-01

## Context

The product depends on licensed Stocksy photography, but API access is not available yet. The
shelf, drag-to-canvas, the shopkeeper's suggestions and the export preview all need real-looking
photos today.

## Decision

- `server/lib/photo-library/library-photo.ts` defines the contract every photo backend implements:

  ```ts
  type PhotoLibrary = {
    isPlaceholder: boolean;
    listPhotos: (source: 'stocksy' | 'owned') => Promise<LibraryPhoto[]>;
  };
  ```

- `placeholder-photo-library.ts` implements it from `placeholder-photos.json`: 26 hand-tagged
  photos served by [picsum.photos](https://picsum.photos) (20 standing in for Stocksy imports,
  6 for the customer's own photos), with real photographer credits.
- `active-photo-library.ts` is the **single swap point**:
  `export const activePhotoLibrary: PhotoLibrary = placeholderPhotoLibrary;`
- `photo.list` returns `isPlaceholder`, and the shelf shows a "Placeholder photos · Stocksy API
  pending" tag while it is true.
- `next.config.ts` allows `picsum.photos` and `fastly.picsum.photos` for `next/image`.

## Consequences

- Swapping to Stocksy means adding a `stocksy-photo-library.ts` that implements `PhotoLibrary`
  and changing one line in `active-photo-library.ts`; routers and the UI do not change.
- Do not make this swap until the product owner explicitly approves it.
- ~~The starter design references placeholder photo 63; replace it when the swap happens.~~ The
  starter design was removed by [ADR 024](024-new-canvas-starts-blank.md); nothing else pins a
  placeholder photo id.
