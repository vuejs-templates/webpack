{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
{{#vuex}}  //vuex为true的时候就会写入这些
import Vuex from 'vuex'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import store from  './store'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/vuex}}
{{#axios}}  //vuex为true的时候就会写入这些
import axios from 'axios'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import api from  './api'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/axios}}
import App from './App'
{{#router}}
import router from './router'
{{/router}}

{{#vuex}}  //vuex为true的时候就会写入这些
Vue.prototype.$store = store
Vue.use(Vuex){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/vuex}}
{{#axios}}  //axios为true的时候就会写入这些
Vue.prototype.axios = axios
{{/axios}}
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
