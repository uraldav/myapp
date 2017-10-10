const { resolve } = require('path');

module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    'import/resolver': {
      alias: [['app-common', resolve('.', 'app-common')]],
    },
  },
  globals: {
    expect: true,
    jest: true,
    describe: true,
    xdescribe: true,
    it: true,
    xit: true,
    beforeEach: true,
    afterEach: true,
  },
  rules: {
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'global-require': 'off',
    'import/prefer-default-export': 'off',
    'linebreak-style': 'off',
    'max-len': 'off',
    'no-confusing-arrow': 'off',
    'no-return-assign': 'off',
    'no-use-before-define': 'off',
    'no-unused-vars': 'warn',
    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': 'error',
    semi: 'error',
    'space-before-function-paren': 'off',
  },
};