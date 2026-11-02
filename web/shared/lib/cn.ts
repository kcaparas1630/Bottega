import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Joins class names and lets later Tailwind utilities win conflicts.
export function cn(...classNames: ClassValue[]) {
  return twMerge(clsx(classNames));
}
