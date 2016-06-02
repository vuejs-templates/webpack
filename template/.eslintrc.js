module.exports = {
  root: true,
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html',
  ],
  'env': {
    'es6': true,
    'browser': true,
  },
  // add your custom rules here
  'rules': {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // Turned off as webpack warns on compile (BUG attempted to resolve Vue files)
    'import/no-unresolved': 0,
  },
};
