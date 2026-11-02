import fs from 'node:fs';
import path from 'node:path';

import { REPO_ROOT, UI_PRIMITIVES_DIRECTORY } from '../../shared/project-layout';
import type { ConventionViolation } from '../shared/convention-violation';

const CONVENTION_DOC = '009-ui-is-built-from-shadcn-primitives.md';
const RAW_ELEMENT_PATTERN = /<(button|input|textarea|select)[\s/>]/g;
const RADIX_IMPORT_PATTERN = /from\s+['"]radix-ui['"]/;

// Outside web/components/ui, no raw form elements and no direct radix-ui imports.
export function checkUiPrimitives(projectFiles: readonly string[]): ConventionViolation[] {
  return projectFiles
    .filter((filePath) => /^web\/.*\.tsx?$/.test(filePath))
    .filter((filePath) => !filePath.startsWith(UI_PRIMITIVES_DIRECTORY))
    .flatMap((filePath) => {
      const source = fs.readFileSync(path.join(REPO_ROOT, filePath), 'utf8');
      const rawElements = [...source.matchAll(RAW_ELEMENT_PATTERN)].map((match) => ({
        conventionDoc: CONVENTION_DOC,
        filePath,
        message: `raw <${match[1]}>: use the shadcn primitive from @/components/ui`,
      }));
      const radixImports = RADIX_IMPORT_PATTERN.test(source)
        ? [{ conventionDoc: CONVENTION_DOC, filePath, message: 'imports radix-ui directly' }]
        : [];
      return [...rawElements, ...radixImports];
    });
}
