import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Demo',
      component: r => require.ensure([], () => r(require('@/pages/Demo.vue')), 'Demo'),
      meta: { title: 'demo', icon: '', keepAlive: true }
    }
  ]
})
