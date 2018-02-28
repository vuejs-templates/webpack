{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}

{{#elementUi}}
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
{{/elementUi}}

{{#vuex}}
import store from './store'
{{/vuex}}


{{#axios}}
import axios from 'axios'
{{/axios}}
{{#vueAxios}}
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
{{/vueAxios}}

{{#cookie}}
import VueCookie from 'vue-cookie'
Vue.use(VueCookie);
{{/cookie}}


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#vuex}}
  store,
  {{/vuex}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
