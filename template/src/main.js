{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
{{#router}}
import router from './router'
{{/router}}
{{#vuex}}
import store from './store' // vuex
{{/vuex}}
{{#axios}}
import axios from 'axios'
Vue.prototype.$http = axios
{{/axios}}
FastClick.attach(document.body)

// debug 开关
const DEBUG_MODE = process.env.NODE_ENV !== 'production'
Vue.config.devtools = DEBUG_MODE
Vue.config.productionTip = DEBUG_MODE

{{#router}}
router.beforeEach((to, from, next) => {
  if(to.params.title){
    sessionStorage.setItem('title',to.params.title)
  }
  document.title = to.meta.title?to.meta.title:sessionStorage.getItem('title')
  // 处理jssdk签名,兼容history模式
  next()
})
{{/router}}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#router}}
  router,
  {{/router}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
