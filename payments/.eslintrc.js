module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                moduleDirectory: ['node_modules', 'src/'],
            },
        },
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        'no-console': 'off',
        'consistent-return': 'off',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/comma-spacing': 'off',
        '@typescript-eslint/return-await': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        'import/extensions': 'off',
        'no-use-before-define': 'off',
        'class-methods-use-this': 'off',
        indent: 'off',
        '@typescript-eslint/indent': ['error'],
        'no-param-reassign': ['error', { props: false }],
        'no-underscore-dangle': 'off',
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
};
