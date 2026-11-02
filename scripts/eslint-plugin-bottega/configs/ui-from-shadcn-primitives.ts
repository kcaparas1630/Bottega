import type { Linter } from 'eslint';

// Convention 009: interactive UI comes from the shadcn primitives in web/components/ui.
export const uiFromShadcnPrimitivesConfig: Linter.Config = {
  name: 'bottega/ui-from-shadcn-primitives',
  files: ['web/**/*.{ts,tsx}'],
  ignores: ['web/components/ui/**'],
  rules: {
    'react/forbid-elements': [
      'error',
      {
        forbid: [
          {
            element: 'button',
            message: 'use <Button> from @/components/ui/button (convention 009)',
          },
          {
            element: 'input',
            message: 'use <Input> from @/components/ui/input (convention 009)',
          },
          {
            element: 'textarea',
            message: 'use <Textarea> from @/components/ui/textarea (convention 009)',
          },
          {
            element: 'select',
            message: 'add and use the shadcn Select primitive (convention 009)',
          },
        ],
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'radix-ui',
            message: 'import the shadcn wrapper from @/components/ui instead (convention 009)',
          },
        ],
      },
    ],
  },
};
