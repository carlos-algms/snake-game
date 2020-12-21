// @ts-check

/**
 * @type {import('eslint').Linter.Config}
 */
const options = {
  env: {
    browser: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: ['./tsconfig.eslint.json'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-use-before-define': ['error', { functions: false, classes: true }],
    'no-plusplus': 'off',
  },
  overrides: [
    {
      files: ['*.js'],
      env: {
        browser: true,
        node: true,
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],

  ignorePatterns: ['node_modules/', 'lib/', 'public/', 'build/', 'dist/'],
};

module.exports = options;
