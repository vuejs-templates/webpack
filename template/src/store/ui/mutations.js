import { SOME_MUTATION } from './mutation-types'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
export default {
  // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
  [SOME_MUTATION] (state) {
      // mutate state
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
