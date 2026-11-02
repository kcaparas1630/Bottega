# ADR 023 — The app rail expands and collapses

- **Status:** Accepted
- **Date:** 2026-11-01
- **Amends:** the nav-rail line of [ADR 018](018-experiment-neutral-professional-chrome.md)

## Context

The 72px icon rail was easy to miss and its 11px labels were small. People also want the room back
when they are deep in a design.

## Decision

- The rail opens **expanded** (220px): each section is a 48px row with a 22px icon and a 15px label;
  sections not yet open show a "Soon" tag. The current section is Brick Red.
- A round toggle on the rail's upper-right border — crossing the border, clear of the section rows —
  **collapses** it to the 80px icon rail
  (64px tiles, icon over a 12px label), and expands it again. Its tooltip names the action.
- The width animates with the house ease-out; no bounce.
- The choice lasts for the visit; remembering it between visits can follow.

## Consequences

- The workspace is narrower while the rail is expanded; collapsing gives 140px back.
- `AppRail` becomes a client component because it holds the expanded state.

## Amendment (2026-11-01)

The rail no longer carries the brick-B mark: the header sign already shows the logo, and a second
mark was redundant. This also replaces "ink rail with the brick-B mark" in
[ADR 019](019-storefront-atmosphere-plain-controls.md). The toggle crosses the rail's right border
at the top, clear of the section rows.
