import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import eslintPluginTSDoc from 'eslint-plugin-tsdoc';
import openWcConfig from '@open-wc/eslint-config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...openWcConfig,
  ...typescriptEslint.configs['flat/recommended'],
  {
    ignores: ['dist/', 'node_modules/', 'coverage/', 'doc/', '.rollup.cache/'],
  },
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    plugins: {
      tsdoc: eslintPluginTSDoc,
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      'import-x/no-unresolved': ['error', { ignore: ['\\.js$'] }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': [
        'error',
        {
          ignoreRestArgs: true,
        },
      ],
      'tsdoc/syntax': 'warn',
      curly: ['error', 'all'],
    },
  },
  {
    files: ['src/**/*.test.{ts,tsx,mts,cts}', 'src/**/*.spec.{ts,tsx,mts,cts}'],
    rules: {
      'import-x/no-extraneous-dependencies': 'off',
      'import-x/no-unresolved': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    },
  },
  eslintConfigPrettier,
];
