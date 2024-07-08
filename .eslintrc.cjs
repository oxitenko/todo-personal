module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: 'current', 'jest/globals': true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'jest'],
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'jest/no-focused-tests': 'off',
  },
};
