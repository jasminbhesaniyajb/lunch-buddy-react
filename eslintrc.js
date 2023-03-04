module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'eslint:recommended',
    'standard',
    'plugin:vue/recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unmodified-loop-condition': 'off'
  },
  "globals": {
    "google": false,
    "_": false,
    "FB": true,
    "gapi":false,
    "L":false
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
