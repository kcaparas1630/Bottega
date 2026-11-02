// Sand blocks of mixed heights while the shelf loads, so the grid does not jump.
const PLACEHOLDER_ASPECT_RATIOS = [
  '4 / 5',
  '3 / 2',
  '1 / 1',
  '2 / 3',
  '3 / 2',
  '4 / 5',
  '1 / 1',
  '3 / 4',
];

export function ShelfPlaceholderTiles() {
  return (
    <ul aria-label="Loading photos" className="columns-3 gap-4">
      {PLACEHOLDER_ASPECT_RATIOS.map((aspectRatio, tileIndex) => (
        <li
          key={tileIndex}
          className="mb-4 animate-pulse break-inside-avoid rounded-md bg-warm-sand"
          style={{ aspectRatio }}
        />
      ))}
    </ul>
  );
}
