{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
require('es5-shim') // 支持es6语法
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// 工具 - ajax
import ajax from './common/ajax'
// 工具 - cache
import cache from './common/cache'
// 工具 -- url
import url from './common/url'

// Rest 插件
import Rest from '../plugins/rest'

// 微信SDK调用
import wxHelp from './common/wxhelp'
// 路由配置
import routerConfig from './route'
// api配置
import restConfig from './rest'
// mock 配置
/* replacing_mock */ // 保留用来dev模式加载mock数据
// 样式文件
import '../stylesheets/app.less'

// 入口文件
import App from './App.vue'

Vue.config.productionTip = false{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#if_eq build "runtime"}}
  render: h => h(App){{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  template: '<App/>',
  components: { App }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  {{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
