/**
 * @.eslintrc.js
 * @author  stylehuan
 * @create  2017-02-09 16:38
 */

/**
 * Created by B41-CX on 2017/2/6.
 */
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
    /*eslint的规则说明
     * 'off或0 - 关闭规则'
     * 'warn或1 - 开启警告规则'
     * 'error或2 - 开启错误规则'
     * */

    'rules': {
        'no-new': 1,//禁止使用new产生副作用
        'no-cond-assign': 2, //禁止条件表达式中出现赋值操作符
        'no-constant-condition': 2, //禁止在条件中使用常量表达式
        'no-dupe-args': 2, //禁止 function 定义中出现重名参数
        'no-dupe-keys': 2, //禁止对象字面量中出现重复的 key
        'no-duplicate-case': 2, //禁止出现重复的 case 标签
        'no-empty': 2, //禁止出现空语句块
        'no-func-assign': 2, //禁止对 function 声明重新赋值
        'no-inner-declarations': 2,//禁止在嵌套的块中出现变量声明或 function 声明
        'no-unexpected-multiline': 2,//禁止出现令人困惑的多行表达式
        'no-unreachable': 2, //禁止在return、throw、continue 和 break 语句之后出现不可达代码
        'use-isnan': 2, //要求使用 isNaN() 检查 NaN
        /*最佳实践*/
        'curly': 2,  //强制所有控制语句使用一致的括号风格
        'eqeqeq': 2, //要求使用 === 和 !==
        'no-alert': 2, //禁用 Alert
        'no-eq-null': 2,//禁止在没有类型检查操作符的情况下与 null 进行比较
        'no-eval': 2, //禁用 eval()
        'no-self-assign': 2,//禁止自我赋值
        // allow paren-less arrow functions
        "space-before-function-paren": [1, {
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "ignore"
        }], //函数名之后不能有空格
        'arrow-parens': 0,
        "semi": [2, "always"],
        "quotes": [2, "single"],
// allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'spaced-comment': 0,
        'comma-dangle': [1, {
            "arrays": "never",
            "objects": "never",
            "imports": "never",
            "exports": "never",
            "functions": "never",
        }],//要求或禁止使用拖尾逗号
        'key-spacing': [1, {'beforeColon': false}],
        'no-mixed-spaces-and-tabs': [1],//禁止使用空格和tab
        'no-cond-assign': [1, 'always'] //禁止在条件语句中出现赋值操作符
    }
}
