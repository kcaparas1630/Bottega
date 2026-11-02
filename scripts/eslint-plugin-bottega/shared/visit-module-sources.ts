import { AST_NODE_TYPES, type TSESLint, type TSESTree } from '@typescript-eslint/utils';

export type ModuleSourceVisit = {
  node: TSESTree.Node;
  specifier: string;
  isTypeOnly: boolean;
};

// Calls back once for every static import, re-export and literal dynamic import.
export function visitModuleSources(
  onModuleSource: (visit: ModuleSourceVisit) => void,
): TSESLint.RuleListener {
  return {
    ImportDeclaration(node) {
      onModuleSource({
        node: node.source,
        specifier: node.source.value,
        isTypeOnly: node.importKind === 'type',
      });
    },
    ExportNamedDeclaration(node) {
      if (!node.source) return;
      onModuleSource({
        node: node.source,
        specifier: node.source.value,
        isTypeOnly: node.exportKind === 'type',
      });
    },
    ExportAllDeclaration(node) {
      onModuleSource({
        node: node.source,
        specifier: node.source.value,
        isTypeOnly: node.exportKind === 'type',
      });
    },
    ImportExpression(node) {
      const { source } = node;
      if (source.type !== AST_NODE_TYPES.Literal || typeof source.value !== 'string') return;
      onModuleSource({ node: source, specifier: source.value, isTypeOnly: false });
    },
  };
}
