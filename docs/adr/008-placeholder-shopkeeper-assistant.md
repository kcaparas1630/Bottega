# ADR 008 — Rule-based placeholder for the shopkeeper assistant

- **Status:** Accepted (temporary)
- **Date:** 2026-11-01

## Context

The brief calls for an AI assistant that helps with image selection and layout, in the warm
voice of a shopkeeper. No model provider, budget or prompt design has been agreed yet, but the
panel, the conversation flow and "tap a suggestion to place it" need to work now.

## Decision

- `shopkeeper.ask` (tRPC mutation) takes `{ message, canvasSummary: { imageCount, textCount } }`
  and returns `{ reply, suggestions: LibraryPhoto[] }`.
- `server/lib/shopkeeper/placeholder-shopkeeper.ts` answers deterministically:
  1. keyword match against shelf photo tags and titles (plural-insensitive) → suggestions;
  2. layout words → advice based on the canvas summary;
  3. type words → typography advice;
  4. greeting or anything else → a friendly reply plus house favourites.
- The UI never knows it is talking to rules: swapping in a model only changes the server
  implementation behind `answerAsShopkeeper`.

## Consequences

- Replies are predictable and free, and the shape of the API is already final.
- Replacing it with an LLM needs a follow-up ADR covering model choice, prompt, cost limits and
  how suggestions are grounded in the shelf's real photo ids.
