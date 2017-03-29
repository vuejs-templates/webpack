module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  {{#if_eq lintConfig "standard"}}
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  {{/if_eq}}
  {{#if_eq lintConfig "airbnb"}}
  extends: 'airbnb-base',
  {{/if_eq}}
  // required to lint *.vue files
  plugins: [
    'vue'
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
    "Vuex": true,
    "VueRouter": true,
    "axios": true
  },
  // add your custom rules here
  'rules': {
    {{#if_eq lintConfig "standard"}}
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    {{/if_eq}}
    {{#if_eq lintConfig "airbnb"}}
    'import/no-unresolved': 0,
    {{/if_eq}}
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'indent': ['error', 4, { "SwitchCase": 1 }],
    "quotes": [2, "single", {"allowTemplateLiterals": true}],
    "semi": [2, "never"],
    "eqeqeq": [1, "allow-null"],
    "new-cap": [1, { "newIsCap": false, "capIsNew": false }],
    "no-new": [0],
    "one-var": 1,//连续声明
    "space-before-function-paren": [0, "always"]//函数定义时括号前面要不要有空格
  }
}
