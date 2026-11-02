import js from '@eslint/js';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import { bottegaPlugin, uiFromShadcnPrimitivesConfig } from './scripts/eslint-plugin-bottega';

// Names too vague to tell a reader what the value holds.
const VAGUE_IDENTIFIERS = [
  'data',
  'temp',
  'tmp',
  'foo',
  'bar',
  'baz',
  'stuff',
  'thing',
  'things',
  'obj',
  'arr',
  'str',
  'num',
  'val',
  'res',
  'ret',
  'cb',
  'fn',
  'func',
  'e',
  'err',
  'el',
  'evt',
];

const BOOLEAN_PREFIXES = ['is', 'has', 'should', 'can', 'did', 'was', 'will', 'are', 'may'];
const rejectVagueNames = { regex: `^(${VAGUE_IDENTIFIERS.join('|')})$`, match: false };

export default defineConfig([
  globalIgnores(['**/node_modules/', '**/.next/', '**/out/', 'web/next-env.d.ts']),
  js.configs.recommended,
  nextCoreWebVitals,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      globals: { ...globals.node },
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    settings: { next: { rootDir: 'web/' }, react: { version: '19.3' } },
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },
  {
    name: 'bottega/conventions',
    files: ['**/*.{ts,tsx,mts}'],
    plugins: { bottega: bottegaPlugin },
    rules: {
      'bottega/one-line-comments': 'error',
      'bottega/no-filler-comments': 'error',
      'bottega/no-sibling-imports': 'error',
      'bottega/feature-sliced-boundaries': 'error',
      'bottega/server-boundary': 'error',
      'bottega/hooks-in-hooks-folder': 'error',
      'id-length': ['error', { min: 2, exceptions: ['x', 'y', '_'], properties: 'never' }],
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'default', format: ['camelCase'], leadingUnderscore: 'allow' },
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          custom: rejectVagueNames,
        },
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: BOOLEAN_PREFIXES,
        },
        { selector: 'function', format: ['camelCase', 'PascalCase'], custom: rejectVagueNames },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          custom: rejectVagueNames,
        },
        { selector: 'typeLike', format: ['PascalCase'] },
        { selector: 'enumMember', format: ['PascalCase'] },
        {
          selector: ['objectLiteralProperty', 'typeProperty', 'objectLiteralMethod'],
          format: null,
        },
        { selector: 'import', format: null },
      ],
      'max-lines': ['error', { max: 150, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': [
        'error',
        { max: 80, skipBlankLines: true, skipComments: true, IIFEs: true },
      ],
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/no-import-type-side-effects': 'error',
    },
  },
  {
    name: 'bottega/one-component-per-file',
    files: ['web/**/*.tsx'],
    rules: { 'react/no-multi-comp': ['error', { ignoreStateless: false }] },
  },
  uiFromShadcnPrimitivesConfig,
  {
    name: 'bottega/shadcn-primitives',
    files: ['web/components/ui/**'],
    rules: {
      'react/no-multi-comp': 'off',
      'max-lines': 'off',
      'max-lines-per-function': 'off',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [tseslint.configs.disableTypeChecked],
  },
]);
