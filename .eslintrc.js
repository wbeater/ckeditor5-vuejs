module.exports = {
    root: false,
    env: {
      node: true
    },
    'extends': ['standard'],
    rules: {
      'no-console': 'off', //process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': 'off', // process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    parserOptions: {
      parser: 'babel-eslint'
    }
  }
  