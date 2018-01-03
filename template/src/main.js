{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}
{{#vuex}}
import store from './store'
{{/vuex}}

{{#flexbox}}
import 'scss-flex/dist/scss-flex.min.css' // flexbox
{{/flexbox}}

{{#if_eq EULConfig "standard"}}
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
{{/if_eq}}

{{#if_eq EULConfig "demand"}}
import './lib/ElementUI'
{{/if_eq}}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#vuex}}
  store, // vuex
  {{/vuex}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}{{#Bus}},
  data: {
    Bus: new Vue() // brother component communication
  }
  {{/Bus}}
})
