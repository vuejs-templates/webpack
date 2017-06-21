// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import VueRouter from 'vue-router'
import router from './route'
import { sync } from 'vuex-router-sync'
import FastClick from 'fastclick'
import 'es6-promise/auto'
import App from './App'
import {dateFormat} from 'vux'

Vue.use(VueRouter)

// 时间戳转换
Vue.filter('ymd', (value) => {
  return dateFormat(new Date(Number(`${value}000`)), 'YYYY-MM-DD')
})

sync(store, router)
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
