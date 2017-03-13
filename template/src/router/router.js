import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import Router from 'vue-router'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import routes from './routes'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
Vue.use(Router){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
let router =  new Router({
  mode: 'history',
  base: __dirname,
  // linkActiveClass: 'actived',
  scrollBehavior: () => ({ y: 0 }),
  routes{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default router
