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
    semi: ['error', 'always'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-var': 1, // warning
    'eslint no-path-concat': 0, // off
    'max-len': ['error', { code: 120 }]
  }
};
