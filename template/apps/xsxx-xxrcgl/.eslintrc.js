module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  "env": {
    "browser": true //执行环境 浏览器
  },
  "globals": {
    "$": true,                                //zepto
    "define": true,                           //requirejs
    "require": true,                           //requirejs
    "WIS_EMAP_SERV": true,
    "BH_UTILS": true,
    "moment": true,
    "Vue": true,
    "VueRouter": true
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'indent': ['error', 4, { "SwitchCase": 1 }],
    "quotes": [2, "single", "avoid-escape"],
    "semi": [2, "always"],
    "eqeqeq": [1, "allow-null"],
    "new-cap": [1, { "newIsCap": false, "capIsNew": false }],
    "no-new": [0]
  }
}
