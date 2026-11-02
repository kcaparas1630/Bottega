import { AST_NODE_TYPES, type TSESTree } from '@typescript-eslint/utils';

import { isHookExemptPath, isInHooksFolder, toRepoPath } from '../../shared/project-layout';
import { createRule } from '../shared/create-rule';

const HOOK_NAME_PATTERN = /^use[A-Z0-9]/;

function exportedIdentifiers(declaration: TSESTree.ExportNamedDeclaration['declaration']) {
  if (declaration?.type === AST_NODE_TYPES.FunctionDeclaration && declaration.id)
    return [declaration.id];
  if (declaration?.type !== AST_NODE_TYPES.VariableDeclaration) return [];
  return declaration.declarations.flatMap((declarator) =>
    declarator.id.type === AST_NODE_TYPES.Identifier ? [declarator.id] : [],
  );
}

export const hooksInHooksFolder = createRule({
  name: 'hooks-in-hooks-folder',
  meta: {
    type: 'problem',
    docs: { description: 'Custom hooks live in a hooks/ folder, never beside components.' },
    schema: [],
    messages: {
      hookOutsideHooksFolder:
        'Move "{{name}}" into a hooks/ folder in this slice (or web/shared/hooks) as its own use-….ts file.',
    },
  },
  defaultOptions: [],
  create(context) {
    const repoPath = toRepoPath(context.filename);
    const isExempt =
      !repoPath.startsWith('web/') || isInHooksFolder(repoPath) || isHookExemptPath(repoPath);
    if (isExempt) return {};
    return {
      ExportNamedDeclaration(node) {
        for (const identifier of exportedIdentifiers(node.declaration)) {
          if (!HOOK_NAME_PATTERN.test(identifier.name)) continue;
          context.report({
            node: identifier,
            messageId: 'hookOutsideHooksFolder',
            data: { name: identifier.name },
          });
        }
      },
    };
  },
});
