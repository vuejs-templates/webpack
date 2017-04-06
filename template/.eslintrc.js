/**
 * @.eslintrc.js
 * @author  stylehuan
 * @create  2017-02-09 16:38
 */

module.exports = {
  root: true,
  parser: 'babel-eslint',//解析器
  parserOptions: { //设置解析器的选项
    sourceType: 'module', //ECMAScript 模块
    // ecmaVersion: 6,// ECMAScript 版本
    /*
     ecmaFeatures: {
     globalReturn: true, //全局return
     impliedStrict: true, //严格模式
     jsx: false,
     experimentalObjectRestSpread: false
     }
     * */
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',//配置文件
  // required to lint *.vue files
  plugins: [ //第三方插件
    'html'
  ],
  /*eslint的规则说明
   * 'off或0 - 关闭规则'
   * 'warn或1 - 开启警告规则'
   * 'error或2 - 开启错误规则'
   * */
  //eslint可以使用注释或配置文件修改你项目中要使用哪些规则
  'rules': { //可以扩展（覆盖）规则
    /*Possible Errors*/
    'no-new': 1,//禁止使用new产生副作用
    'no-cond-assign': 1, //禁止条件表达式中出现赋值操作符
    'no-constant-condition': 1, //禁止在条件中使用常量表达式
    'no-dupe-args': 2, //禁止 function 定义中出现重名参数
    'no-dupe-keys': 2, //禁止对象字面量中出现重复的 key
    'no-duplicate-case': 1, //禁止出现重复的 case 标签
    'no-empty': 1, //禁止出现空语句块
    'no-func-assign': 1, //禁止对 function 声明重新赋值
    'no-inner-declarations': 1,//禁止在嵌套的块中出现变量声明或 function 声明
    'no-unexpected-multiline': 1,//禁止出现令人困惑的多行表达式
    'no-unreachable': 1, //禁止在return、throw、continue 和 break 语句之后出现不可达代码
    'use-isnan': 1, //要求使用 isNaN() 检查 NaN
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,//禁用 debugger
    'no-extra-semi': 2,//禁止不必要的分号
    /*最佳实践*/
    'curly': 1,  //强制所有控制语句使用一致的括号风格
    'eqeqeq': [2, "always"], //要求使用 === 和 !==
    'no-alert': 1, //禁用 Alert
    'no-eq-null': 1,//禁止在没有类型检查操作符的情况下与 null 进行比较
    'no-eval': 1, //禁用 eval()
    'no-self-assign': 1,//禁止自我赋值
    "semi": [0, "always"],//要求或禁止使用分号而不是 ASI
    "quotes": [2, "single"],//强制使用一致的单引号
    'key-spacing': [2, {'beforeColon': false}],//禁止在对象字面量的键和值之间存在空格
    'no-mixed-spaces-and-tabs': [1],//禁止使用空格和tab
    "no-useless-escape": 0, //禁用不必要的转义字符
    'no-useless-call': 0, //避免不必要的 .call() 和 .apply()
    'no-multiple-empty-lines': 0,//禁止出现多行空行
    'no-fallthrough': 2,//禁止 case 语句落空
    'no-with': 2,//禁用 with 语句
    /*Variables*/
    'no-undef': 2,//禁用未声明的变量
    "no-unused-vars": 2,//不要留下未使用的变量
    'no-use-before-define': 0,//禁止在变量定义之前使用它们
    'no-delete-var': 2, //禁止删除变量
    /*Stylistic Issues*/
    'one-var': [2, 'never'],//强制函数中的变量分开声明
    'camelcase': 0,//强制使用骆驼拼写法命名约定
    "space-before-function-paren": [2, {//函数名之后不能有空格
      "anonymous": "never", //针对匿名函数表达式
      "named": "never", //针对命名的函数表达式
      "asyncArrow": "never" //针对异步的箭头函数表达式
    }],
    'comma-dangle': [2, { //要求或禁止使用拖尾逗号
      "arrays": "never",
      "objects": "never",
      "imports": "never",
      "exports": "never",
      "functions": "never",
    }],
    "indent": 0,//强制使用一致的缩进
    'padded-blocks': 0,//代码块中避免多余留白
    'eol-last': 0,//要求或禁止文件末尾存在空行
    'no-tabs': 0,//不要使用制表符
    'keyword-spacing': 2,//强制在关键字前后使用一致的空格
    'array-bracket-spacing': [2, 'never'],//禁止在数组方括号内有空格
    'block-spacing': 2, //禁止在单行代码块中使用空格
    'comma-spacing': [2, {"before": false, "after": true}],//逗号后面有空格，前面无空格
    'space-in-parens': 2,//禁止圆括号内的空格
    'max-params': [2, 4],//限制函数定义中最大参数个数
    'max-statements': [2, 50],//限制函数块中的语句的最大数量
    'quote-props': [2, 'consistent-as-needed'], //如果有属性名称要求使用引号，则所有的属性名称都要使用引号；否则，禁止所有的属性名称使用引号
    /*ECMAScript 6*/
    'arrow-parens': 0,
    'generator-star-spacing': 0,//强制 generator 函数中 * 号周围使用一致的空格
    'spaced-comment': 0,//强制在注释中 // 或 /* 使用一致的空格
    'no-duplicate-imports': 2,//同一模块有多个导入时一次性写完
    'handle-callback-err': 0,//要求回调函数中有容错处理
  }
};
