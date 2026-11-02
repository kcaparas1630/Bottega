import { AST_TOKEN_TYPES, type TSESLint, type TSESTree } from '@typescript-eslint/utils';

import { createRule } from '../shared/create-rule';
import { isProseComment, readCommentText } from '../shared/read-comment-text';

const MAX_COMMENT_LENGTH = 120;

function isAloneOnItsLine(comment: TSESTree.Comment, sourceCode: TSESLint.SourceCode) {
  const lineText = sourceCode.lines[comment.loc.start.line - 1] ?? '';
  return lineText.slice(0, comment.loc.start.column).trim() === '';
}

function continuesPreviousComment(
  comment: TSESTree.Comment,
  previousComment: TSESTree.Comment | undefined,
  sourceCode: TSESLint.SourceCode,
) {
  if (!previousComment) return false;
  const areBothLineComments =
    comment.type === AST_TOKEN_TYPES.Line && previousComment.type === AST_TOKEN_TYPES.Line;
  return (
    areBothLineComments &&
    previousComment.loc.end.line === comment.loc.start.line - 1 &&
    isAloneOnItsLine(comment, sourceCode) &&
    isAloneOnItsLine(previousComment, sourceCode)
  );
}

export const oneLineComments = createRule({
  name: 'one-line-comments',
  meta: {
    type: 'suggestion',
    docs: { description: 'Every comment is a single, short line.' },
    schema: [],
    messages: {
      multiLineBlock:
        'Comments must fit on one line. Rename the code so it explains itself, then keep one line for the "why".',
      stackedLineComments:
        'Comments must fit on one line; this continues the comment above. Merge them into one line.',
      tooLong: `Comments must be at most ${MAX_COMMENT_LENGTH} characters. Say it shorter.`,
    },
  },
  defaultOptions: [],
  create(context) {
    const { sourceCode } = context;
    return {
      Program() {
        const proseComments = sourceCode.getAllComments().filter(isProseComment);
        proseComments.forEach((comment, commentIndex) => {
          const isMultiLineBlock =
            comment.type === AST_TOKEN_TYPES.Block &&
            comment.loc.start.line !== comment.loc.end.line;
          if (isMultiLineBlock) context.report({ loc: comment.loc, messageId: 'multiLineBlock' });
          if (continuesPreviousComment(comment, proseComments[commentIndex - 1], sourceCode)) {
            context.report({ loc: comment.loc, messageId: 'stackedLineComments' });
          }
          if (readCommentText(comment).length > MAX_COMMENT_LENGTH) {
            context.report({ loc: comment.loc, messageId: 'tooLong' });
          }
        });
      },
    };
  },
});
