import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import App from './App.vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
