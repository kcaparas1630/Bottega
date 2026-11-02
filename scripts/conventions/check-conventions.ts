import { listProjectFiles } from '../shared/list-project-files';
import { checkHookPlacement } from './checks/check-hook-placement';
import { checkPathNaming } from './checks/check-path-naming';
import { checkPublicApiFiles } from './checks/check-public-api-files';
import { checkSharedModules } from './checks/check-shared-modules';
import { checkSliceStructure } from './checks/check-slice-structure';
import { checkUiPrimitives } from './checks/check-ui-primitives';

const CONVENTIONS_DOCS_PATH = 'docs/code-conventions';

const projectFiles = listProjectFiles();
const violations = [
  ...checkPathNaming(projectFiles),
  ...checkSliceStructure(projectFiles),
  ...checkPublicApiFiles(projectFiles),
  ...checkSharedModules(projectFiles),
  ...checkHookPlacement(projectFiles),
  ...checkUiPrimitives(projectFiles),
];

if (violations.length === 0) {
  console.log(`✔ Code conventions hold across ${projectFiles.length} files.`);
  process.exit(0);
}

const conventionDocs = [...new Set(violations.map(({ conventionDoc }) => conventionDoc))].sort();
for (const conventionDoc of conventionDocs) {
  console.error(`\n${CONVENTIONS_DOCS_PATH}/${conventionDoc}`);
  for (const violation of violations.filter((entry) => entry.conventionDoc === conventionDoc)) {
    console.error(`  ✖ ${violation.filePath}: ${violation.message}`);
  }
}
console.error(`\n✖ ${violations.length} code convention violation(s).`);
process.exit(1);
