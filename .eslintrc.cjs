module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['.eslintrc.cjs'],
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'eslint-config-prettier'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    'import/order': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
