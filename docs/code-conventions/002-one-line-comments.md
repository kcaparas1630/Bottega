# 002 — Comments are one clear line, or nothing

Code explains _what_ through names (convention 001). A comment is for the _why_ a name cannot
carry: a constraint, a trade-off, a non-obvious unit. When one is needed it is **one line**, clear
and concise.

## Rules

1. A comment fits on a single line: one `//` line, or a single-line `/** … */`.
2. No stacked `//` lines that form a paragraph.
3. At most 120 characters.
4. No filler:
   - dividers (`// ------`, `// =====`)
   - section labels (`// Imports`, `// State`, `// Handlers`, `// End of component`)
   - self-reference (`// This function …`, `// The component …`) — start with what it does
   - commented-out code — delete it; git remembers
   - bare task markers (`// TODO`) — write the task: `// TODO: retry saves after reconnect`

Tool directives are not prose and are ignored: `eslint-…`, `@ts-…`, `prettier-ignore`,
`/// <reference …>`, `#region`.

## Examples

```ts
// ✗
// ---------- helpers ----------
/*
 * This function creates the order code.
 * It uses random letters.
 */
// const legacyCode = makeCode();

// ✓
// Letters and digits that cannot be misread for one another (no 0/O or 1/I).
const ORDER_CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
```

## Enforced by

| Check                               | Covers                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------ |
| ESLint `bottega/one-line-comments`  | multi-line block comments, stacked line comments, length > 120           |
| ESLint `bottega/no-filler-comments` | dividers, section labels, self-reference, commented-out code, bare TODOs |
