import Vue from 'vue'{{#if_eq eslintConfig "airbnb"}};{{/if_eq}}
import App from './App'{{#if_eq eslintConfig "airbnb"}};{{/if_eq}}

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }{{#if_eq eslintConfig "airbnb"}},{{/if_eq}}
}){{#if_eq eslintConfig "airbnb"}};{{/if_eq}}
