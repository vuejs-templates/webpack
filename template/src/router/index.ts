import Vue from 'vue'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
import Router from 'vue-router'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
import Hello from '../components/Hello.vue'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}

Vue.use(Router){{#if_eq tslintConfig "airbnb"}};{{/if_eq}}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello{{#if_eq tslintConfig "airbnb"}},{{/if_eq}}
    }{{#if_eq tslintConfig "airbnb"}},{{/if_eq}}
  ]{{#if_eq tslintConfig "airbnb"}},{{/if_eq}}
}){{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
