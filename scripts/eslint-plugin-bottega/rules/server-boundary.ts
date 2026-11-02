import { resolveSpecifierPath } from '../../shared/module-resolution';
import { SERVER_PACKAGE_NAME, WEB_ALIAS_PREFIX, toRepoPath } from '../../shared/project-layout';
import { createRule } from '../shared/create-rule';
import { visitModuleSources } from '../shared/visit-module-sources';

// Only the tRPC route handler may load server code at runtime.
const SERVER_RUNTIME_ENTRY_DIRECTORY = 'web/app/api/';

export const serverBoundary = createRule({
  name: 'server-boundary',
  meta: {
    type: 'problem',
    docs: { description: 'Server code never ships to the browser, and never imports web code.' },
    schema: [],
    messages: {
      runtimeServerImport: `Use "import type" for "${SERVER_PACKAGE_NAME}". Only ${SERVER_RUNTIME_ENTRY_DIRECTORY} may load server code at runtime.`,
      serverImportsWeb:
        'Server code cannot import web code ("{{specifier}}"). Move the shared contract into server/lib.',
    },
  },
  defaultOptions: [],
  create(context) {
    const importerRepoPath = toRepoPath(context.filename);
    const isWebFile = importerRepoPath.startsWith('web/');
    const isServerFile = importerRepoPath.startsWith('server/');
    const mayLoadServerRuntime = importerRepoPath.startsWith(SERVER_RUNTIME_ENTRY_DIRECTORY);
    return visitModuleSources(({ node, specifier, isTypeOnly }) => {
      const isServerPackage = specifier === SERVER_PACKAGE_NAME;
      if (isWebFile && isServerPackage && !isTypeOnly && !mayLoadServerRuntime) {
        context.report({ node, messageId: 'runtimeServerImport' });
        return;
      }
      if (!isServerFile) return;
      const targetPath = resolveSpecifierPath(context.filename, specifier);
      const isWebTarget =
        specifier.startsWith(WEB_ALIAS_PREFIX) ||
        (targetPath !== null && toRepoPath(targetPath).startsWith('web/'));
      if (isWebTarget) context.report({ node, messageId: 'serverImportsWeb', data: { specifier } });
    });
  },
});
