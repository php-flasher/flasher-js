module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { project: ['./tsconfig.json', './packages/*/tsconfig.json'] },
  plugins: ['@typescript-eslint', 'import'],
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
