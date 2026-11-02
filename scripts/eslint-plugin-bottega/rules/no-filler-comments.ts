import { createRule } from '../shared/create-rule';
import { isProseComment, readCommentText } from '../shared/read-comment-text';

type FillerMessageId =
  'divider' | 'sectionLabel' | 'selfReference' | 'commentedOutCode' | 'emptyTaskMarker';

const FILLER_PATTERNS: readonly { pattern: RegExp; messageId: FillerMessageId }[] = [
  { pattern: /^[-=*#~_/\s]{3,}$/, messageId: 'divider' },
  {
    pattern:
      /^(end of .*|imports?|exports?|types?|interfaces?|constants?|variables?|state|props|hooks?|effects?|handlers?|helpers?|utils?|functions?|methods?|render|component|styles?|main|setup|init|logic)[.:]?$/i,
    messageId: 'sectionLabel',
  },
  {
    pattern: /^(this|the) (function|method|component|hook|variable|constant|file|class|type)\b/i,
    messageId: 'selfReference',
  },
  {
    pattern: /^(const|let|var|import|export|function|return|await)\s.+[;{]$|^[\w.]+\(.*\);$/,
    messageId: 'commentedOutCode',
  },
  { pattern: /^(todo|fixme|hack|xxx)\b:?$/i, messageId: 'emptyTaskMarker' },
];

export const noFillerComments = createRule({
  name: 'no-filler-comments',
  meta: {
    type: 'suggestion',
    docs: { description: 'Comments carry information, never decoration or dead code.' },
    schema: [],
    messages: {
      divider: 'Remove divider comments. Split the file instead of drawing lines through it.',
      sectionLabel:
        'Remove section-label comments. If a file needs sections, each section deserves its own file.',
      selfReference:
        'Start with what it does, not "This function…". Example: "Debounces saves so typing stays smooth."',
      commentedOutCode: 'Delete commented-out code. Git already remembers it.',
      emptyTaskMarker: 'A TODO needs the task itself. Write what is left to do, in one line.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      Program() {
        for (const comment of context.sourceCode.getAllComments().filter(isProseComment)) {
          const commentText = readCommentText(comment);
          const filler = FILLER_PATTERNS.find(({ pattern }) => pattern.test(commentText));
          if (filler) context.report({ loc: comment.loc, messageId: filler.messageId });
        }
      },
    };
  },
});
