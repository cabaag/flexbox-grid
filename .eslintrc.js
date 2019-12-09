module.exports = {
   env: {
      browser: true,
      es6: true,
   },
   extends: ['airbnb-base'],
   globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
   },
   parserOptions: {
      ecmaFeatures: {
         jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
   },
   rules: {
      'no-console': 1,
   },
};
