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
    'no-new': 0,//禁止使用new产生副作用
    'no-cond-assign': 2, //禁止条件表达式中出现赋值操作符
    'no-constant-condition': 2, //禁止在条件中使用常量表达式
    'no-dupe-args': 2, //禁止 function 定义中出现重名参数
    'no-dupe-keys': 2, //禁止对象字面量中出现重复的 key
    'no-duplicate-case': 2, //禁止出现重复的 case 标签
    'no-empty': 2, //禁止出现空语句块
    'no-empty-character-class': 2, //禁止在正则表达式中使用空字符集
    'no-func-assign': 2, //禁止对 function 声明重新赋值
    'no-inner-declarations': 0,//禁止在嵌套的块中出现变量声明或 function 声明
    'no-unexpected-multiline': 2,//禁止出现令人困惑的多行表达式
    'no-unreachable': 2, //禁止在return、throw、continue 和 break 语句之后出现不可达代码
    'use-isnan': 2, //禁止使用 isNaN() 检查 NaN
    'no-debugger': 2,//禁用 debugger
    'no-extra-semi': 2,//禁止不必要的分号
    'no-control-regex': 2,//禁止在正则表达式中使用控制字符
    'no-ex-assign': 2,//禁止对 catch 子句的参数重新赋值
    'no-extra-boolean-cast': 2,//禁止不必要的布尔转换
    'no-regex-spaces': 2,//正则中避免使用多个空格
    'no-extra-parens': 2,//禁止不必要的括号({{}})
    'no-invalid-regexp': 2, //禁止 RegExp 构造函数中存在无效的正则表达式字符串
    'no-obj-calls': 2,//禁止把全局对象作为函数调用
    'no-sparse-arrays': 2, //禁用稀疏数组
    'valid-typeof': 2,//用合法的字符串跟 typeof 进行比较操作
    /*最佳实践*/
    'accessor-pairs': 2,//强制 getter 和 setter 在对象中成对出现
    'curly': [2, 'multi-line'],  //强制所有控制语句使用一致的括号风格
    'eqeqeq': 2, //要求使用 === 和 !==
    'no-alert': 2, //禁用 Alert
    /*'no-eq-null': 2,//禁止在没有类型检查操作符的情况下与 null 进行比较*/
    'no-eval': 2, //禁用 eval()
    'no-self-assign': 2,//禁止自我赋值
    "semi": [2, "always"],//要求使用分号
    "quotes": [2, "single", {'avoidEscape': true, 'allowTemplateLiterals': true}],//强制使用一致的单引号
    'key-spacing': [2, {'beforeColon': false, 'afterColon': true}],//禁止在对象字面量的键和值之间存在空格
    'no-mixed-spaces-and-tabs': 2,//禁止使用空格和tab
    "no-useless-escape": 0, //禁用不必要的转义字符
    'no-useless-call': 2, //避免不必要的.call() 和.apply()
    'no-multiple-empty-lines': 2,//禁止出现多行空行
    'no-fallthrough': 2,//禁止 case 语句落空
    'no-with': 2,//禁用 with 语句,
    'default-case': 2,//要求 switch 语句中有 default 分支
    'consistent-return': 2, //要求 return 语句要么总是指定返回的值，要么不指定
    'dot-notation': 2, //要求使用点号
    'no-else-return': 2,//禁止 if 语句中 return 语句之后有 else 块
    'no-extend-native': 2,//不要扩展原生对象
    'no-octal': 2,//不要使用八进制字面量
    'no-redeclare': 2, //不要重复声明变量
    'no-extra-bind': 2,//禁止不必要的 .bind() 调用
    'no-implied-eval': 2,//禁止使用类似 eval() 的方法
    'no-proto': 2,//禁用 __proto__ 属性
    'no-return-assign': 2,//禁止在 return 语句中使用赋值语句
    'no-empty-pattern': 2, //禁止使用空解构模式
    'no-floating-decimal': 2,//禁止数字字面量中使用前导和末尾小数点
    'no-throw-literal': 2, //用throw抛错时，抛出 Error 对象而不是字符串
    'no-unmodified-loop-condition': 2,//循环语句中注意更新循环变量
    /*Variables*/
    'no-undef': 2,//禁用未声明的变量
    'no-undef-init': 2,//禁止将变量初始化为 undefined
    "no-unused-vars": 2,//不要留下未使用的变量
    'no-use-before-define': 2,//禁止在变量定义之前使用它们
    'no-delete-var': 2, //禁止删除变量
    /*Stylistic Issues*/
    'brace-style': [2, '1tbs', {'allowSingleLine': true}],//强制在代码块中使用一致的大括号风格 允许块的开括号和闭括号在 同一行
    'block-scoped-var': 0,//强制把变量的使用限制在其定义的作用域范围内
    'one-var': [2, 'never'],//强制函数中的变量分开声明
    'camelcase': [2, {'properties': 'always'}],//强制使用骆驼拼写法命名约定 强制属性名称为驼峰风格
    "space-before-function-paren": [2, {//函数名之后不能有空格
      "anonymous": "never", //针对匿名函数表达式
      "named": "never", //针对命名的函数表达式
      "asyncArrow": "never" //针对异步的箭头函数表达式
    }],
    'comma-dangle': [2, 'never'],//禁止使用拖尾逗号
    "indent": 2,//强制使用一致的缩进 目前缩进4个空格
    'padded-blocks': 2,//代码块中避免多余留白
    'eol-last': 2,//要求文件末尾存在空行
    'no-tabs': 2,//不要使用制表符
    'keyword-spacing': 2,//强制在关键字前后使用一致的空格
    'array-bracket-spacing': [2, 'never'],//禁止在数组方括号内有空格
    'block-spacing': [2, 'never'], //禁止在单行代码块中使用空格
    'comma-spacing': [2, {"before": false, "after": true}],//逗号后面有空格，前面无空格
    'space-in-parens': 2,//禁止圆括号内的空格
    'max-params': [2, 4],//限制函数定义中最大参数个数
    'max-statements': [2, 50],//限制函数块中的语句的最大数量
    'quote-props': [2, 'consistent-as-needed'], //如果有属性名称要求使用引号，则所有的属性名称都要使用引号；否则，禁止所有的属性名称使用引号
    'dot-location': [2, 'property'],//强制在点号之前或之后换行 表达式中的点号操作符应该和属性在同一行
    'new-cap': [2, {'newIsCap': true, 'capIsNew': false}],//要求构造函数首字母大写
    'new-parens': 2, //要求调用无参构造函数时有圆括号
    'func-names': 0, //要求或禁止使用命名的 function 表达式
    'func-style': 2, //强制一致地使用 function 声明或表达式
    'newline-after-var': [2, 'always'],//要求变量声明语句后有一行空行
    'no-array-constructor': 2, //使用数组字面量而不是构造器
    'no-caller': 2,//禁用 arguments.caller 或 arguments.callee
    'no-continue': 0,//禁用 continue 语句
    'no-multi-spaces': 2,//禁止使用多个空格
    'no-new-object': 2,//禁用 Object 的构造函数
    'no-new-wrappers': 2,//禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-ternary': 0,//禁用三元操作符
    'no-self-compare': 2,//禁止自身比较
    'no-label-var': 2, //不允许标签与变量同名
    'no-labels': 2,//不要使用标签语句
    'no-lone-blocks': 2,//禁用不必要的嵌套块
    'no-multi-str': 0, //禁止使用多行字符串
    'no-unneeded-ternary': 0,//如果有更好的实现，尽量不要使用三元表达式
    'no-unsafe-finally': 2,//finally 代码块中不要再程序流程
    'no-whitespace-before-property': 2,//属性前面不要加空格
    'space-infix-ops': 2, //**字符串拼接操作符（Infix operators）**之间要留空格
    'space-unary-ops': 0,//一元运算符后面跟一个空格
    'wrap-iife': 2,//自调用匿名函数 (IIFEs) 需要使用括号包裹
    'yoda': 0,//请书写优雅的条件语句
    /*ECMAScript 6*/
    'arrow-parens': 0,
    'no-class-assign': 2,//禁止修改类声明的变量
    'no-const-assign': 2,//禁止修改 const 声明的变量
    'generator-star-spacing': 0,//强制 generator 函数中 * 号周围使用一致的空格
    'spaced-comment': 0,//强制在注释中 // 或 /* 使用一致的空格
    'no-duplicate-imports': 2,//同一模块有多个导入时一次性写完
    'handle-callback-err': 0,//要求回调函数中有容错处理
    'comma-style': [2, 'last'], //强制使用一致的逗号风格
    'complexity':[2, 20], //指定程序中允许的最大环路复杂度
    'computed-property-spacing': [2, 'never'],//禁止在计算的属性的方括号中使用空格
    'constructor-super': 0, //要求在构造函数中有 super() 的调用
    'no-new-require': 2,//禁止调用 require 时使用 new 操作符
    'no-dupe-class-members': 2,//禁止类成员中出现重复的名称
    'no-this-before-super': 2,//禁止在构造函数中，在调用 super() 之前使用 this 或 super
    'no-useless-computed-key': 2,//避免使用不必要的动态计算值作对象属性
    'no-new-symbol': 2, //禁止使用 Symbol 构造器
    'no-path-concat': 2,//使用 __dirname 和 __filename 时尽量避免使用字符串拼接
    'no-useless-constructor': 2,//禁止多余的构造器
    'prefer-const': 2,//要求使用 const 声明那些声明后不再被修改的变量
  }
};
