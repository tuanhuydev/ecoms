module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    'no-use-before-define': 'off',
    'no-var': 1, // warning
    'eslint no-path-concat': 0, // off
    'no-undef': 'off',
    'space-before-function-paren': 0, // off
    'max-len': ['error', { code: 120 }],
    'comma-dangle': ['error', 'never'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    semi: ['error', 'always'],
    'no-unused-vars': ['warn', { vars: 'all' }]
  }
};
