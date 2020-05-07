module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
    mocha: true
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'no-param-reassign': ['error', { props: false }],
    "no-unused-vars": ['error', { varsIgnorePattern: 'should|expect' }],
    "no-console": ["error", { allow: ['warn', 'error', 'log'] }],
    "consistent-return": 'off'
  }
};
