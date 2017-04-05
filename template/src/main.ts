{{#if_eq build 'standalone'}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}

import './hooks'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}} // This must be imported before any component

import App from './App.vue'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
{{#router}}
import router from './router'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
{{/router}}

Vue.config.productionTip = false{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}

// tslint:disable-next-line:no-unused-new
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#if_eq build 'runtime'}}
  render: (h) => h(App)
  {{/if_eq}}
  {{#if_eq build 'standalone'}}
  template: '<App/>',
  components: { App }{{#if_eq tslintConfig "airbnb"}},{{/if_eq}}
  {{/if_eq}}
}){{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
