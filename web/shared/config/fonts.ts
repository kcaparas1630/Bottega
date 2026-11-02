import { Fraunces, Instrument_Sans } from 'next/font/google';

// High-contrast serif for the sign and headings; its SOFT and WONK axes stay available for designs.
export const displayFont = Fraunces({
  subsets: ['latin'],
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-fraunces',
  display: 'swap',
});

// Plain, highly readable sans for every UI label and body line.
export const bodyFont = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  display: 'swap',
});
