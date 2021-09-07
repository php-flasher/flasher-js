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
        'jsx-a11y',
        'react',
    ],
    extends: [
        'airbnb-typescript',
    ],
    settings: {
        react: {
            version: "latest"
        }
    }
};
