// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // 0 禁用此规则 1 不符合规则即给出警告 2 不符合规则即报错
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    "no-unused-vars": [0, { "vars": "all", "args": "after-used" }],//不能有声明后未被使用的变量或参数
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "semi": [2, "always"],//语句强制分号结尾
    "semi-spacing": process.env.NODE_ENV === 'production' ? 'off' : [1, { "before": false, "after": true }],//分号前后空格
    "space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
    "no-redeclare": 0,// 允许重复声明变量
    "no-eval": 0//允许使用eval
  }
}
