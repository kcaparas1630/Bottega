import fs from 'node:fs';
import path from 'node:path';

import ts from 'typescript';

import { resolveModuleFile } from '../../shared/module-resolution';
import {
  REPO_ROOT,
  isInSharedFolder,
  isPublicApiFile,
  toRepoPath,
} from '../../shared/project-layout';
import type { ConventionViolation } from '../shared/convention-violation';

const CONVENTION_DOC = '004-imports-flow-down-or-into-shared.md';
const SOURCE_FILE_PATTERN = /\.(ts|tsx|mts)$/;

function listImportedFiles(repoPath: string) {
  const absolutePath = path.join(REPO_ROOT, repoPath);
  const { importedFiles } = ts.preProcessFile(fs.readFileSync(absolutePath, 'utf8'), true, true);
  return importedFiles
    .map(({ fileName }) => resolveModuleFile(absolutePath, fileName))
    .filter((targetPath) => targetPath !== null)
    .map(toRepoPath);
}

// Maps each imported module to the files that import it, ignoring public API re-exports.
function collectImporters(projectFiles: readonly string[]) {
  const importersByModule = new Map<string, Set<string>>();
  const importingFiles = projectFiles.filter(
    (filePath) => SOURCE_FILE_PATTERN.test(filePath) && !isPublicApiFile(filePath),
  );
  for (const importerPath of importingFiles) {
    for (const importedPath of listImportedFiles(importerPath)) {
      const importers = importersByModule.get(importedPath) ?? new Set<string>();
      importers.add(importerPath);
      importersByModule.set(importedPath, importers);
    }
  }
  return importersByModule;
}

// A module used by two or more files must live in a shared/ or lib/ folder.
export function checkSharedModules(projectFiles: readonly string[]): ConventionViolation[] {
  return [...collectImporters(projectFiles)]
    .filter(([modulePath, importers]) => {
      const isExempt = isPublicApiFile(modulePath) || isInSharedFolder(modulePath);
      return importers.size > 1 && !isExempt;
    })
    .map(([modulePath, importers]) => ({
      conventionDoc: CONVENTION_DOC,
      filePath: modulePath,
      message: `imported by ${importers.size} files (${[...importers].join(', ')}); move it into a shared/ or lib/ folder at their nearest common parent`,
    }));
}
