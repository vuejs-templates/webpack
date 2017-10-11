{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import App from './App'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import VueLazyLoad from 'vue-lazyload'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{#router}}
import router from './router'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/router}}
{{#if_eq style "stylus"}}
import 'common/stylus/index.styl'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/if_eq}}

{{#if_eq typefor "mobile"}}
import fastclick from 'fastclick'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/if_eq}}
{{#vuex}}
import store from './store'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/vuex}}
Vue.config.productionTip = false{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{#if_eq typefor "mobile"}}
fastclick.attach(document.body){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/if_eq}}

Vue.use(VueLazyLoad, {
  loading: require('common/images/default.png'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

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
  render: h => h(App){{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  template: '<App/>',
  components: { App }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  {{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
