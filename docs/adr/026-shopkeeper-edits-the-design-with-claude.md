# ADR 026 — The shopkeeper edits the design with Claude structured outputs

- **Status:** Accepted
- **Date:** 2026-11-01
- **Supersedes:** [ADR 008](008-placeholder-shopkeeper-assistant.md)

## Context

The rule-based shopkeeper (ADR 008) can only talk: it suggests photos and gives canned layout
advice. People want to ask for a change ("a birthday card with flowers", "make the headline
bigger") and see it happen on the paper. A design is already a plain JSON object validated by one
zod schema (ADR 009, 013, 014), so a model can read it and write a changed copy of it.

## Decision

### Model and call

- The server package calls **Claude Sonnet 5** (`claude-sonnet-5`) through `@anthropic-ai/sdk`,
  with adaptive thinking at `medium` effort and up to 16,000 output tokens.
- Credentials come from `ANTHROPIC_API_KEY` in `web/.env.local` (copied from `.env.example` at
  the repo root). The client is created on first use, so a missing key fails one question rather
  than the whole API.

### One procedure, one path

- `shopkeeper.ask({ message, design })` returns `{ reply, suggestions, design | null }`.
- The client always sends its working copy of the design; the autosaved copy can be 800 ms behind.
- An empty paper and a full one take the same path. The prompt says: on an empty paper, compose a
  design for what was asked; otherwise change only what was asked and copy every other element
  through with the same id and values.

### Structured output (`server/lib/shopkeeper/shopkeeper-design-schema.ts`)

- The response format is `{ reply, design | null, suggestedPhotoIds }`, passed as
  `output_config.format` with the SDK's `zodOutputFormat`. `design` is `null` when nothing on the
  paper should change.
- The design schema is **derived from `canvasDesignSchema`**, so it mirrors the real design, with
  two differences:
  1. no design `id`; the server keeps the current one;
  2. image elements carry `photoId` only. The server fills in `photoUrl`, `photoTitle` and
     `photoAspectRatio` from the photo library, so the model cannot invent a URL and every photo
     is a real library photo. The prompt lists the library (id, title, tags, aspect ratio).
- The model reads the design in the same shape it writes.
- Structured outputs enforce the shape (objects, required fields, types). The SDK's
  `zodOutputFormat` moves everything else (ranges, patterns, enum values, the `kind` literals)
  into field descriptions, and zod checks them on the way back.
- After hydrating photos, duplicate element ids are renamed, images with unknown photos are dropped,
  and the result is validated against `canvasDesignSchema`.
- A turn that is refused, cut off at the token limit or fails validation gets a polite "say that
  another way" reply, changes nothing and is not recorded.

### Applying the change

- The client applies a returned design with a new canvas store action, `replaceDesign`: one undo
  step that keeps the selection when the element still exists. Autosave (ADR 009) persists it, and
  Ctrl/⌘ + Z takes the shopkeeper's change back.

### Conversation memory (`server/lib/shopkeeper/conversation-store.ts`)

- Conversations live in memory on `globalThis`, keyed by design id, like designs (ADR 009). No
  database.
- Each holds two lists:
  - **model messages**, append-only: every customer turn carries the design it was asked about,
    every shopkeeper turn the model's content blocks unchanged (thinking included);
  - **the transcript** the chat shows: author, text and suggested photos.
- `shopkeeper.conversation({ designId })` returns the transcript, so a reload shows the chat.
- Automatic prompt caching (`cache_control` on the request) covers the stable prefix: the system
  prompt with the library, then the history.

### Removed

`placeholder-shopkeeper.ts`, `find-matching-photos.ts`, `shopkeeper-replies.ts`, the
`canvasSummary` input and `readCanvasSummary`.

## Consequences

- Answers cost money and take seconds; "Checking the back room…" covers the wait.
- Every question resends the history, which grows by about one design per turn. Caching keeps
  repeated tokens cheap; a very long chat will need trimming or compaction.
- Conversations reset when the server restarts, like designs.
- Edits made while the shopkeeper is working are replaced by its design. Undo restores them,
  because the step before the shopkeeper's change includes them.
- The house fonts and palette are restated in the prompt, because the server cannot import web
  config. Changing the brand palette means changing the prompt too.
- Without credentials the shopkeeper answers with the "didn't catch that" reply; the rest of the
  API still works.
- Swapping models is one constant in `server/lib/shopkeeper/ask-shopkeeper-model.ts`.
