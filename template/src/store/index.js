import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import Vuex from 'vuex'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import ui from './ui'{{#if_eq lintConfig "airbnb"}};{{/if_eq}} // 导入ui模块

Vue.use(Vuex){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{#vuex-i18n}}
import VuexI18n from 'vuex-i18n'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/vuex-i18n}}
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // 在非生产环境下，使用严格模式
  state: {},
  modules: {
    {{#vuex-i18n}}
    i18n: VuexI18n.store,
    {{/vuex-i18n}}
    ui{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default store{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
