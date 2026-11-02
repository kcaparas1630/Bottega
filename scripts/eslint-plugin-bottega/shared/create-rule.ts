import { ESLintUtils } from '@typescript-eslint/utils';

const CONVENTIONS_DOCS_URL =
  'https://github.com/kcaparas1630/Bottega/blob/main/docs/code-conventions';

const CONVENTION_DOC_BY_RULE: Record<string, string> = {
  'one-line-comments': '002-one-line-comments.md',
  'no-filler-comments': '002-one-line-comments.md',
  'no-sibling-imports': '004-imports-flow-down-or-into-shared.md',
  'feature-sliced-boundaries': '005-feature-sliced-layers.md',
  'server-boundary': '006-server-code-stays-on-the-server.md',
  'hooks-in-hooks-folder': '008-hooks-live-in-hooks-folders.md',
};

// Builds a rule whose docs link points at the convention it enforces.
export const createRule = ESLintUtils.RuleCreator(
  (ruleName) => `${CONVENTIONS_DOCS_URL}/${CONVENTION_DOC_BY_RULE[ruleName] ?? 'index.md'}`,
);
