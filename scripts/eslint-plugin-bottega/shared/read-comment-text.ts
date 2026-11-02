import { AST_TOKEN_TYPES, type TSESTree } from '@typescript-eslint/utils';

const TOOLING_DIRECTIVE_PATTERN =
  /^(eslint|global|globals|exported|@ts-|prettier-ignore|#region|#endregion|\/ <reference)/;

// Returns a comment's words without delimiters or JSDoc asterisks.
export function readCommentText(comment: TSESTree.Comment) {
  return comment.value.replace(/^\*+/, '').replace(/\*+$/, '').trim();
}

// Directives for tools are not prose, so comment rules skip them.
export function isToolingDirective(comment: TSESTree.Comment) {
  return TOOLING_DIRECTIVE_PATTERN.test(readCommentText(comment));
}

export function isProseComment(comment: TSESTree.Comment) {
  const isLineOrBlock =
    comment.type === AST_TOKEN_TYPES.Line || comment.type === AST_TOKEN_TYPES.Block;
  return isLineOrBlock && !isToolingDirective(comment);
}
