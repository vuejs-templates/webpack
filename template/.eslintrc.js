module.exports = {
  root: true,
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  //extends: 'standard',
  extends: "airbnb/base",
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'indent': [2, 4, { 'SwitchCase': 1 }],
    'spaced-comment': 0,
    'semi': 0,
    'quote-props': 0,
    'comma-dangle': [2, 'never'],
    'space-before-function-paren': 0,
    'no-param-reassign': [2, {'props': false}],
    'object-curly-spacing': 0,
    'max-len': [1, 80, 4],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
