# ADR 022 — The inspector returns to comfortable sizing

- **Status:** Accepted
- **Date:** 2026-11-01
- **Supersedes:** the inspector line of [ADR 018](018-experiment-neutral-professional-chrome.md)
  (320px, 32px controls, 11px labels)

## Context

The dense inspector of ADR 018 matched Figma's density but was too small for the people Bottega is
for: small tiles and 11px labels made the panel feel cramped. The earlier panel
([ADR 012](012-canva-style-editor-layout.md)'s sizing rule, as finished in ADR 017) was preferred.

## Decision

- Inspector 360px wide; inputs, switches and buttons 40px tall; panel text 13–15px; labels are
  12px letter-spaced capitals (`label-caps`).
- Choice tiles sit two to a row: page sizes, photo filters, layer order.
- The open tab is mustard with a hairline edge; chosen options are filled in Brick Ink.
- Hairline borders and soft shadows only, as in ADR 018; no ink outlines or hard shadows.

## Consequences

- The workspace is 40px narrower than with the dense panel.
- `label-caps` returns to 12px everywhere it is used (rail labels set their own size).
