# 001 — Names say what things are and do

A file, folder, variable, function or type name must be clear enough that a developer who has
never seen the code knows what it holds or does.

## Rules

1. **Identifiers**
   - Variables, parameters and functions: `camelCase`. React components: `PascalCase`.
     Module-level constants: `UPPER_CASE`. Types: `PascalCase`.
   - Booleans start with `is`, `has`, `should`, `can`, `did`, `was`, `will`, `are` or `may`:
     `isShelfOpen`, `didSaveFail`.
   - Functions start with a verb that says what they do: `createTextElement`, `readCanvasSummary`.
   - No vague names: `data`, `temp`, `tmp`, `foo`, `bar`, `baz`, `stuff`, `thing(s)`, `obj`, `arr`,
     `str`, `num`, `val`, `res`, `ret`, `cb`, `fn`, `func`, `e`, `err`, `el`, `evt`.
     Rename on destructure: `const { data: shelf } = useListPhotos(...)`.
   - At least two characters, except `x`, `y` (coordinates) and `_` (ignored).
2. **Files and folders**
   - `kebab-case`, named after their one job: `use-canvas-sync.ts`, `product-mockups.ts`.
   - Banned file names: `utils`, `util`, `helpers`, `helper`, `misc`, `common`, `stuff`, `temp`,
     `tmp`, `data`, `types`, `constants`, `functions`, `things`.
   - Exceptions: `README.md`, `index.ts` (public API), and Next.js routing folders in `web/app`
     (`[param]`, `[...slug]`, `(group)`, `@slot`, `_private`).

## Examples

```ts
// ✗
const data = useListPhotos({ source });
const open = useState(false);
function handle(e) {}

// ✓
const { data: shelf } = useListPhotos({ source });
const [isShelfOpen, setIsShelfOpen] = useState(true);
function handlePointerDown(event: PointerEvent<HTMLElement>) {}
```

## Enforced by

| Check                                                    | Covers                                                                            |
| -------------------------------------------------------- | --------------------------------------------------------------------------------- |
| ESLint `@typescript-eslint/naming-convention`            | casing, boolean prefixes, vague-name regex on variables, functions and parameters |
| ESLint `id-length` (min 2, except `x`, `y`, `_`)         | one-letter names                                                                  |
| Script `check-path-naming` (`bun run check:conventions`) | kebab-case files and folders, banned vague file names, Next.js route exceptions   |
