import { isHookExemptPath, isInHooksFolder } from '../../shared/project-layout';
import type { ConventionViolation } from '../shared/convention-violation';

const CONVENTION_DOC = '008-hooks-live-in-hooks-folders.md';
const HOOK_FILE_PATTERN = /\/use-[a-z0-9-]+\.tsx?$/;

// Hook files sit in hooks/ folders, and hooks/ folders hold nothing but hook files.
export function checkHookPlacement(projectFiles: readonly string[]): ConventionViolation[] {
  return projectFiles
    .filter((filePath) => filePath.startsWith('web/') && /\.tsx?$/.test(filePath))
    .flatMap((filePath) => {
      const isHookFile = HOOK_FILE_PATTERN.test(filePath);
      const isInHooks = isInHooksFolder(filePath);
      if (isHookFile && !isInHooks && !isHookExemptPath(filePath)) {
        return [
          {
            conventionDoc: CONVENTION_DOC,
            filePath,
            message: 'move this hook into a hooks/ folder',
          },
        ];
      }
      if (isInHooks && !isHookFile) {
        return [
          {
            conventionDoc: CONVENTION_DOC,
            filePath,
            message: 'a hooks/ folder holds only use-*.ts files',
          },
        ];
      }
      return [];
    });
}
