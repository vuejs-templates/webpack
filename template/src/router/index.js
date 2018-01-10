import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld{{#typescript}}.vue{{/typescript}}'

Vue.use(Router)

export default new Router({
  routes: [
    {
      component: HelloWorld,
      name: 'HelloWorld',
      path: '/',
    }
  ]
})
