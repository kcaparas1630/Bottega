# ADR 024 — A new canvas starts blank, on the client

- **Status:** Accepted
- **Date:** 2026-11-01
- **Amends:** [ADR 009](009-canvas-state-and-autosave.md)

## Context

The server answered the first `canvas.get` by creating a starter design (a photo and a headline),
and the editor showed "Setting out the paper…" until that arrived. People expect a new canvas to be
blank and ready the moment the editor opens, with no network round trip in the way.

## Decision

- `canvas.get` returns the saved design, or `null` when nothing has been saved. The server no longer
  creates designs; the starter design is removed.
- On mount the client loads a blank design straight away (`createBlankDesign`): "Untitled canvas",
  Square 1000 × 1000, Mortar Cream paper, no elements.
- When the server answers with a saved design and nothing has been edited yet, the saved design
  replaces the blank one. After the first edit the client keeps its own copy, and autosave writes
  it as before.
- The blank page is truly empty: no placeholder text or hint is drawn on it.

## Consequences

- The editor is usable before the server answers, and a first visit costs no server-side design.
- A blank design is only saved once it is edited.
- Edits made in the instant before a saved design arrives win over that saved design.
