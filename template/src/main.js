{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import routes from './router.js'
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'hash',
  routes: routes,
});
{{/router}}

{{#elementUi}}
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
{{/elementUi}}
{{#filter}}
import filters from './filter/filter'
{{/filter}}
Vue.config.productionTip = false
{{#filter}}
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
{{/filter}}
/* eslint-disable no-new */
new Vue({
  el: '#app',
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
