{{#if_eq build "runtime"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import Router from 'vue-router'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import App from './App'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import store from './store'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import Home from './pages/Home'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

Vue.use(Router){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const router = new Router({
  mode: 'history',
  scrollBehavior: () => {{ y: 0 }},
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  ]{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  ...App{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export { app, router }{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
