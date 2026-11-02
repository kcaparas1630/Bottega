import path from 'node:path';

import { resolveModuleFile } from '../../shared/module-resolution';
import { isInSharedFolder, isPublicApiFile, toRepoPath } from '../../shared/project-layout';
import { createRule } from '../shared/create-rule';
import { visitModuleSources } from '../shared/visit-module-sources';

export const noSiblingImports = createRule({
  name: 'no-sibling-imports',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Imports flow down into sub-folders, into shared/lib folders, or through a public index.ts.',
    },
    schema: [],
    messages: {
      siblingImport:
        '"{{specifier}}" sits next to this file. Move it into a sub-folder named after this file, or into a shared/ or lib/ folder if several files use it.',
      importOutsideOwnFolder:
        '"{{specifier}}" lives outside this file\'s folder. Import from your own sub-folders, from a shared/ or lib/ folder, or through a public index.ts.',
    },
  },
  defaultOptions: [],
  create(context) {
    const importerPath = context.filename;
    if (isPublicApiFile(importerPath)) return {};
    const importerDirectory = path.dirname(importerPath);
    return visitModuleSources(({ node, specifier }) => {
      const targetPath = resolveModuleFile(importerPath, specifier);
      if (!targetPath) return;
      const targetDirectory = path.dirname(targetPath);
      const isInOwnSubFolder = targetDirectory.startsWith(`${importerDirectory}${path.sep}`);
      const isShared = isInSharedFolder(toRepoPath(targetPath));
      if (isInOwnSubFolder || isShared || isPublicApiFile(targetPath)) return;
      context.report({
        node,
        messageId:
          targetDirectory === importerDirectory ? 'siblingImport' : 'importOutsideOwnFolder',
        data: { specifier },
      });
    });
  },
});
