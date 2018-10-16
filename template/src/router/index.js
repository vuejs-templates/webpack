let lay = ''
{{#if_eq Layout "yes"}}
lay = require('@/page/Base/layout.vue')
{{/if_eq}}
{{#if_eq Layout "no"}}
lay = require('@/page/Base/index.vue')
{{/if_eq}}
export default new VueRouter({
  routes: [
    { path: '/',
      redirect: 'home',
      component: r => require.ensure([], () => r(lay), 'layout'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: r => require.ensure([], () => r(require('@/page/home/index.vue')), 'home'),
          meta: { title: 'home', icon: '', keepAlive: true }
        }
      ]
    },
    {
      path: '*',
      name: '404',
      component: r => require.ensure([], () => r(require('@/page/Base/404.vue')), 'notFound'),
      meta: { title: 'notFound', icon: '', keepAlive: false }
    }
  ]
})
