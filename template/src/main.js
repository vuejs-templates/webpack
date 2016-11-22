{{#if_eq build "runtime"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}{{#vueRouter}}{{#vuex}}
import { sync } from 'vuex-router-sync'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}{{/vuex}}{{/vueRouter}}
import App from './App'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}{{#vueRouter}}
import router from './router/router'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}{{/vueRouter}}{{#vuex}}
import store from './vuex/store'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}{{#vueRouter}}

sync(store, router){{#if_eq lintConfig "airbnb"}};{{/if_eq}}{{/vueRouter}}{{/vuex}}

/* eslint-disable no-new */
new Vue({
  el: '#app',{{#vueRouter}}
  router,{{/vueRouter}}{{#vuex}}
  store,{{/vuex}}
  {{#if_eq build "runtime"}}
  render: h => h(App){{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  template: '<App/>',
  components: { App }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  {{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
