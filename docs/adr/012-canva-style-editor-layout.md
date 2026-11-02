# ADR 012 — Canva-style editor layout: app rail, floating add dock, properties inspector

- **Status:** Accepted; the "Look" section is superseded by
  [ADR 018](018-experiment-neutral-professional-chrome.md)
- **Date:** 2026-11-01
- **Supersedes:** the "Layout and feel" section of [ADR 005](005-bricks-bodega-design-language.md)
  and its "anything that looks like Figma or Canva" line. Palette, type and texture still stand.

## Context

The first layout (tool rail + shelf on the left, contextual toolbar on top, shopkeeper chat on the
right) read as generic: the right third of the screen was an empty chat, the left rail mixed app
navigation with canvas tools, the shelf was a long captioned list, and selected elements could
only be styled from a crowded top bar. People already know how a design canvas works from Canva,
Figma and Adobe Express, so Bottega should follow that model and keep its own look.

References studied:

- **Canva** — a left side panel holds the raw material (text, elements, uploads); a contextual
  toolbar follows the selection; _Position_ opens a panel with _Arrange_ (forward, backward, to
  front, to back, align to page, width/height/ratio lock, X/Y) and a _Layers_ tab.
  ([Canva help: finding and arranging layers](https://www.canva.com/help/finding-and-arranging-layers/))
- **Figma UI3** — properties grouped by task in a right panel; Figma tried floating side panels
  and went back to fixed ones after feedback, keeping only the compact tool bar floating.
  ([Figma: our approach to designing UI3](https://www.figma.com/blog/our-approach-to-designing-ui3/),
  [Navigating UI3](https://help.figma.com/hc/articles/23954856027159))
- **Adobe Express** — a page properties panel when nothing is selected, align-to-page controls,
  search and filters at the top of asset panels.
  ([Align elements](https://helpx.adobe.com/express/web/organize-your-designs/arrange-layers-and-pages/align-elements.html))

## Decision

```
┌────┬─────────────────────────────────────────────────────────┬───────────────────┐
│ ▣  │ Good morning card ✎   ↶ ↷                 ✓ Saved  [Export]                    │
│Canvas├───────────────────────────────────────────────────────┬───────────────────┤
│ ▤  │                                                       │ Design Layers Ask │
│Canvases                                                    │ Photo · Size ·     │
│ ⧉  │                  ┌──────────────┐                     │ Position · Layer   │
│Orders                │    paper     │                     │                   │
│ ▭  │                  └──────────────┘                     │                   │
│Payments          ╭ Photos · Text · Shapes ╮      ╭− 72% +╮│                   │
└────┴───────────────────────────────────────────────────────┴───────────────────┘
```

1. **App rail (left, fixed, Brick Ink).** App navigation, not canvas tools: _Canvas_ (the editor,
   active), _Canvases_, _Orders_, _Payments_. Only _Canvas_ is enabled; the others render
   disabled with a "Coming soon" tooltip until their pages exist. Widget `app-rail`.
2. **Top bar.** Editable canvas name, undo/redo, save status, and Export pinned top-right in
   Brick Red. No contextual toolbar here any more. Widget `editor-header`.
3. **Workspace (centre).** The paper is the hero on a sand-coloured table, fitted to the space
   above the dock, with zoom (fit, steps, Ctrl/⌘ + wheel). Selection shows a solid Clay frame with
   corner and side handles drawn outside the paper's clip, plus a small floating bar above it
   (duplicate, delete). Widget `canvas-workspace`.
4. **Floating add dock (bottom centre of the workspace).** The only floating chrome: _Photos_,
   _Text_, _Shapes_. Each opens a popover above the dock:
   - _Photos_ — the shelf: source switch (Stocksy / Your photos), search, topic chips and a
     masonry grid; click to place, or drag onto the paper (the popover fades while dragging).
   - _Text_ — presets: heading, subheading, body.
   - _Shapes_ — rectangle, rounded, circle, arch.
5. **Inspector (right, fixed).** Three tabs:
   - _Design_ — follows the selection. Nothing selected → page size presets and paper colour.
     Element selected → its own style section (photo filters and fit; typeface, size, alignment
     and ink; shape and fill), then _Size_ (W/H with ratio lock, aspect presets), _Position_
     (align to page, X/Y) and _Layer_ (to front, forward, backward, to back, opacity).
   - _Layers_ — every element, front-most first; click to select.
   - _Shopkeeper_ — the assistant conversation (ADR 008), no longer a whole column of its own.

### Look

- Three planes: Brick Ink rail, light cream chrome (`--chrome`), sand table (`--workspace`), and
  the paper on top with `shadow-paper-lifted`.
- Brick Red stays an accent: Export, the brand tile, active states. The brick strip under the
  header is retired; texture lives on the paper, not on the chrome.
- Panels use a 4px spacing grid, section labels in semibold sans, and tabular numbers for
  measurements. Hand-cut corners (`rounded-hand*`) stay on paper-like things (tiles, cards,
  popovers), not on every control.
- Comfortable sizing over density: the inspector is 360px wide; inputs, switches and buttons are
  at least 36px tall; no chrome text is below 12px (only the rail and dock labels use 12px), panel
  text is 13–15px; choice tiles (page sizes, photo filters, layer order)
  sit two to a row; the photo shelf shows three columns in a panel up to 720px wide.

## Consequences

- Widgets `workbench` and `shopkeeper-panel` and feature `selection-toolbar` are removed; new
  slices are widgets `app-rail` and `inspector-panel`, features `design-properties`,
  `layers-list`, `add-shape`, `edit-history` and `rename-canvas`.
- Showing properties for every element type needs the editing model in
  [ADR 013](013-canvas-editing-model.md) (history, shapes, page sizes, opacity, alignment).
- Disabled navigation items are promises; each one needs its own ADR and route before it is
  switched on.
- The layout is desktop-first (≥ 1280 px wide). A narrow-screen layout is future work.
