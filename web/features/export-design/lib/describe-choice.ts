// A short line naming the chosen options, for example "Deli green · Size L".
export function describeChoice(colorName: string, size: string | null) {
  return size ? `${colorName} · Size ${size}` : colorName;
}
