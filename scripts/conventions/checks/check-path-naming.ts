import path from 'node:path';

import type { ConventionViolation } from '../shared/convention-violation';

const CONVENTION_DOC = '001-clear-names.md';
const KEBAB_CASE_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// Next.js routing folders: [param], [...slug], (group), @slot and _private.
const NEXT_ROUTE_FOLDER_PATTERN =
  /^(\[{1,2}(\.\.\.)?[a-z][a-zA-Z0-9]*\]{1,2}|\([a-z0-9-]+\)|@[a-z0-9-]+|_[a-z0-9-]+)$/;
const CONVENTIONAL_FILE_NAMES = new Set(['README.md']);
const VAGUE_FILE_STEMS = new Set([
  'utils',
  'util',
  'helpers',
  'helper',
  'misc',
  'common',
  'stuff',
  'temp',
  'tmp',
  'data',
  'types',
  'constants',
  'functions',
  'things',
]);

function isValidFolderName(folderName: string, folderPath: string) {
  const isNextRouteFolder = folderPath.startsWith('web/app/');
  return (
    KEBAB_CASE_PATTERN.test(folderName) ||
    (isNextRouteFolder && NEXT_ROUTE_FOLDER_PATTERN.test(folderName))
  );
}

function checkFileName(filePath: string): ConventionViolation | null {
  const fileName = path.posix.basename(filePath);
  if (CONVENTIONAL_FILE_NAMES.has(fileName)) return null;
  const [fileStem = ''] = fileName.split('.');
  if (!KEBAB_CASE_PATTERN.test(fileStem)) {
    return { conventionDoc: CONVENTION_DOC, filePath, message: 'file names are kebab-case' };
  }
  if (VAGUE_FILE_STEMS.has(fileStem)) {
    const message = `"${fileStem}" says nothing about the contents; name the file after its one job`;
    return { conventionDoc: CONVENTION_DOC, filePath, message };
  }
  return null;
}

// Every file and folder name is kebab-case and specific about what it holds.
export function checkPathNaming(projectFiles: readonly string[]): ConventionViolation[] {
  const folderPaths = new Set(
    projectFiles.flatMap((filePath) => {
      const segments = path.posix.dirname(filePath).split('/');
      return segments.map((_, segmentIndex) => segments.slice(0, segmentIndex + 1).join('/'));
    }),
  );
  const folderViolations = [...folderPaths]
    .filter((folderPath) => !isValidFolderName(path.posix.basename(folderPath), folderPath))
    .map((folderPath) => ({
      conventionDoc: CONVENTION_DOC,
      filePath: `${folderPath}/`,
      message: 'folder names are kebab-case',
    }));
  const fileViolations = projectFiles.map(checkFileName).filter((violation) => violation !== null);
  return [...folderViolations, ...fileViolations];
}
