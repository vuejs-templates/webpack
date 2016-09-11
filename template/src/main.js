{{#if_eq build "standalone"}}
// the following line loads the standalone build instead of Runtime-only
// thanks to an alias defined in /config/webpack.base.conf.js
// So you don't have to do import Vue from 'vue/dist/vue'
{{/if_eq}}
import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import App from './App'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App){{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
