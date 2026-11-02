# Architecture Decision Records

An ADR records one significant decision: the context, what we chose, and what it costs us.
ADRs are immutable once accepted; to change a decision, write a new ADR that supersedes the old
one and update the old one's status.

| #   | Decision                                                                                                               | Status                   |
| --- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| 001 | [Bun workspace with `web` and `server` packages](001-bun-workspace-with-web-and-server-packages.md)                    | Accepted                 |
| 002 | [Next.js App Router client and server, connected by tRPC](002-nextjs-app-router-with-trpc.md)                          | Accepted                 |
| 003 | [Feature-Sliced Design for the web package](003-feature-sliced-design.md)                                              | Accepted                 |
| 004 | [shadcn/ui primitives styled with Tailwind CSS](004-shadcn-and-tailwind-for-ui.md)                                     | Accepted                 |
| 005 | ["Bricks Bodega" design language](005-bricks-bodega-design-language.md)                                                | Layout superseded by 012 |
| 006 | [The logo ships as inline SVG, not WebP](006-logo-ships-as-inline-svg.md)                                              | Accepted                 |
| 007 | [Placeholder photo library until the Stocksy API is approved](007-placeholder-photo-library-until-stocksy.md)          | Accepted (temporary)     |
| 008 | [Rule-based placeholder for the shopkeeper assistant](008-placeholder-shopkeeper-assistant.md)                         | Accepted (temporary)     |
| 009 | [Canvas state in a Zustand entity store, autosaved over tRPC](009-canvas-state-and-autosave.md)                        | Accepted                 |
| 010 | [Conventions are enforced by ESLint, scripts and a pre-commit hook](010-conventions-enforced-at-commit.md)             | Accepted                 |
| 011 | [Pin ESLint 9 and TypeScript 6.0](011-pin-eslint-9-and-typescript-6.md)                                                | Accepted                 |
| 012 | [Canva-style editor layout: app rail, floating add dock, properties inspector](012-canva-style-editor-layout.md)       | Look superseded by 018   |
| 013 | [Canvas editing model: undo history, shapes, page sizes and element properties](013-canvas-editing-model.md)           | Partly superseded by 014 |
| 014 | [Open colours and fonts for design content](014-open-colours-and-fonts-for-design-content.md)                          | Accepted                 |
| 015 | [The editor is a bodega: storefront, brick wall, counter and order pad](015-bodega-storefront-direction.md)            | Superseded by 018        |
| 016 | [A professional finish: the bodega as an established shop](016-professional-finish.md)                                 | Superseded by 018        |
| 017 | [Keep the storefront's character, give it a serious finish](017-storefront-character-with-a-serious-finish.md)         | Superseded by 018        |
| 018 | [Neutral, professional chrome; the design carries the colour](018-experiment-neutral-professional-chrome.md)           | Partly superseded by 019 |
| 019 | [The storefront is atmosphere; the controls stay plain](019-storefront-atmosphere-plain-controls.md)                   | Partly superseded by 020 |
| 020 | [Commercial heritage shopfront: flat colour and sign-writing, no drawn textures](020-commercial-heritage-shopfront.md) | Accepted                 |
| 021 | [The add dock is the shop counter again](021-counter-dock-returns.md)                                                  | Accepted                 |
| 022 | [The inspector returns to comfortable sizing](022-comfortable-inspector.md)                                            | Accepted                 |
| 023 | [The app rail expands and collapses](023-collapsible-app-rail.md)                                                      | Accepted                 |
| 024 | [A new canvas starts blank, on the client](024-new-canvas-starts-blank.md)                                             | Accepted                 |
| 025 | [The export is a proof: the design on real products, in real-time 3D](025-export-proof-in-real-time-3d.md)             | Proposed                 |

## Writing a new ADR

1. Copy the template below into `NNN-short-kebab-title.md` with the next number.
2. Keep it to one decision. Link related ADRs by number.
3. Add a row to the table above.

```md
# ADR NNN — Title as a statement of the decision

- **Status:** Proposed | Accepted | Superseded by ADR NNN
- **Date:** YYYY-MM-DD

## Context

What forces are at play, and why a decision is needed now.

## Decision

What we will do, concretely enough to check.

## Consequences

What becomes easier, what becomes harder, and what we must now do.
```
