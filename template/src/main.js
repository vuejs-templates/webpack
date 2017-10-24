{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}

import StoreConfig from '@config/StoreConfig';
import ComponentConfig from '@config/ComponentConfig';
import NetworkConfig from '@config/NetworkConfig';
import PrototypeConfig from '@config/PrototypeConfig';
import LocationConfig from '@config/LocationConfig';

Vue.config.productionTip = false
ComponentConfig.createComponent(Vue);
NetworkConfig.createNetwork();
PrototypeConfig.createPrototype(Vue);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router: router.initRouter(),
  {{/router}}
  store: StoreConfig.initStore(),
  {{#if_eq build "runtime"}}
  render: h => h(App){{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  template: '<App/>',
  mounted: function () {
    LocationConfig.appPickLocation().then(() => {
    }).catch(() => {
    });
  },
  components: { App }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  {{/if_eq}}
})
