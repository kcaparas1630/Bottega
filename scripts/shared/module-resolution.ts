import fs from 'node:fs';
import path from 'node:path';

import { REPO_ROOT, WEB_ALIAS_PREFIX } from './project-layout';

const SOURCE_EXTENSIONS = ['.ts', '.tsx', '.mts', '.js', '.mjs', '.jsx'];

function isExistingFile(candidatePath: string) {
  return fs.existsSync(candidatePath) && fs.statSync(candidatePath).isFile();
}

// Maps a relative or `@/` specifier to an absolute path; returns null for packages.
export function resolveSpecifierPath(importerPath: string, specifier: string) {
  if (specifier.startsWith(WEB_ALIAS_PREFIX)) {
    return path.join(REPO_ROOT, 'web', specifier.slice(WEB_ALIAS_PREFIX.length));
  }
  if (specifier.startsWith('.')) return path.resolve(path.dirname(importerPath), specifier);
  return null;
}

// Finds the file a specifier loads, trying extensions and folder index files.
export function resolveModuleFile(importerPath: string, specifier: string) {
  const basePath = resolveSpecifierPath(importerPath, specifier);
  if (!basePath) return null;
  const candidates = [
    basePath,
    ...SOURCE_EXTENSIONS.map((extension) => `${basePath}${extension}`),
    ...SOURCE_EXTENSIONS.map((extension) => path.join(basePath, `index${extension}`)),
  ];
  return candidates.find(isExistingFile) ?? null;
}
