import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    { path: '/',
      redirect: 'home',
      component: r => require.ensure([], () => r(require('@/page/Base/layout.vue')), 'layout'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: r => require.ensure([], () => r(require('@/page/demo/index.vue')), 'home'),
          meta: { title: 'home', icon: '', keepAlive: true }
        }
      ]
    }
  ]
})
