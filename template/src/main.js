{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
// 支持es5语法, 低版本的android机的一些浏览器还不支持es5
require('es5-shim')

import Vue from 'vue'
// vuex 仓库
import store from './vuex/store'

// 微信SDK调用
import wechat from './wechat'
// 路由配置
import router from './router'
// api配置
import rest from './rest'
// 初始化全局toast, loading
import './common/mixins'
// mock 配置
// 保留用来dev模式加载mock数据
// replacing_mock

import cache from './common/cache'
// import url from './common/url'
// 样式文件
import './assets/styles/app.less'

// 清空sessionStorage
cache.clearSessionData()

// 入口文件
import App from './App.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  store, // vuex
  rest, // api
  wechat, // wx
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  template: '<App/>',
  components: { App }
  {{/if_eq}}
})
