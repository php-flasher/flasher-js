module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    ignorePatterns: ['.eslintrc.js'],
    plugins: [
        '@typescript-eslint',
        'import',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
    ],
    rules: {},
    settings: {
        'import/resolver': {
            typescript: {}
        },
    },
};
