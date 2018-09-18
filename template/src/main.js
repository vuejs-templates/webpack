{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
import store from './store'
import Mixin from './mixin'
import utils from './utils/common'
import Vuex from 'vuex'
{{#router}}
import router from './router'
{{/router}}

{{#elementUI}}
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
{{/elementUI}}

Vue.use(Vuex)
Vue.config.productionTip = false
// 全局引入utils
Vue.prototype.utils = utils

// 全局混入
Vue.mixin(Mixin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
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
