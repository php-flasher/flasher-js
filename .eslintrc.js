module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    ignorePatterns: ['.eslintrc.js'],
    plugins: [
        '@typescript-eslint',
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