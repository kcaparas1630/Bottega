import fs from 'node:fs';
import path from 'node:path';

import ts from 'typescript';

import { REPO_ROOT, isPublicApiFile } from '../../shared/project-layout';
import type { ConventionViolation } from '../shared/convention-violation';

const CONVENTION_DOC = '005-feature-sliced-layers.md';
// Each entity keeps all of its tRPC hooks together in api/index.ts.
const ENTITY_API_INDEX_PATTERN = /^web\/entities\/[^/]+\/api\/index\.ts$/;

function isReExportOrSideEffectImport(statement: ts.Statement) {
  const isReExport = ts.isExportDeclaration(statement) && statement.moduleSpecifier !== undefined;
  const isSideEffectImport = ts.isImportDeclaration(statement) && !statement.importClause;
  return isReExport || isSideEffectImport;
}

function isEntityHookStatement(statement: ts.Statement) {
  const isExportedConstant =
    ts.isVariableStatement(statement) &&
    statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);
  return ts.isImportDeclaration(statement) || isExportedConstant === true;
}

function findDisallowedStatements(repoPath: string) {
  const sourceText = fs.readFileSync(path.join(REPO_ROOT, repoPath), 'utf8');
  const sourceFile = ts.createSourceFile(repoPath, sourceText, ts.ScriptTarget.Latest, true);
  const isAllowed = ENTITY_API_INDEX_PATTERN.test(repoPath)
    ? isEntityHookStatement
    : isReExportOrSideEffectImport;
  return sourceFile.statements
    .filter((statement) => !isAllowed(statement))
    .map((statement) => statement.getText(sourceFile).split('\n')[0] ?? '');
}

// index.ts is a public API that only re-exports; entity api/index.ts may define hooks.
export function checkPublicApiFiles(projectFiles: readonly string[]): ConventionViolation[] {
  return projectFiles.filter(isPublicApiFile).flatMap((repoPath) =>
    findDisallowedStatements(repoPath).map((statementLine) => ({
      conventionDoc: CONVENTION_DOC,
      filePath: repoPath,
      message: `index.ts only re-exports; move "${statementLine}" into its own file`,
    })),
  );
}
