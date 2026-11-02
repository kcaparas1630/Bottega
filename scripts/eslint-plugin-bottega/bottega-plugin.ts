import type { ESLint } from 'eslint';

import { featureSlicedBoundaries } from './rules/feature-sliced-boundaries';
import { hooksInHooksFolder } from './rules/hooks-in-hooks-folder';
import { noFillerComments } from './rules/no-filler-comments';
import { noSiblingImports } from './rules/no-sibling-imports';
import { oneLineComments } from './rules/one-line-comments';
import { serverBoundary } from './rules/server-boundary';

const bottegaRules = {
  'one-line-comments': oneLineComments,
  'no-filler-comments': noFillerComments,
  'no-sibling-imports': noSiblingImports,
  'feature-sliced-boundaries': featureSlicedBoundaries,
  'server-boundary': serverBoundary,
  'hooks-in-hooks-folder': hooksInHooksFolder,
};

// Bottega's code conventions as ESLint rules; see docs/code-conventions.
export const bottegaPlugin: ESLint.Plugin = {
  meta: { name: 'eslint-plugin-bottega' },
  // typescript-eslint's RuleModule still types ESLint 8 context methods, so it needs this bridge.
  rules: bottegaRules as unknown as NonNullable<ESLint.Plugin['rules']>,
};
