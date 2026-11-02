import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

import { REPO_ROOT } from './project-layout';

// Top-level folders whose files must follow the conventions.
const CONVENTION_ROOTS = ['web', 'server', 'scripts', 'docs'];

// Tracked and new files only, so anything in .gitignore (builds, caches) is never checked.
export function listProjectFiles() {
  const gitOutput = execFileSync(
    'git',
    ['ls-files', '-z', '--cached', '--others', '--exclude-standard', '--', ...CONVENTION_ROOTS],
    { cwd: REPO_ROOT, encoding: 'utf8' },
  );
  const repoPaths = gitOutput.split('\0').filter((repoPath) => repoPath !== '');
  return [...new Set(repoPaths)].filter((repoPath) =>
    fs.existsSync(path.join(REPO_ROOT, repoPath)),
  );
}
