import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
function loadView(view) {
  return () => import(`@/pages/${view}.vue`)
}
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: loadView('index'),
      meta: { requiresAuth: true }
    },
    {
      path: '/home',
      name: 'home',
      component: loadView('home'),
      meta: { requiresAuth: true }
    },
    {
      path: '/charts',
      name: 'charts',
      component: loadView('charts'),
      meta: { requiresAuth: true }
    },
    {
      path: '/details',
      name: 'details',
      component: loadView('details'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: loadView('login')
    },
  ]
});

// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requiresAuth)) { 
    if (localStorage.getItem('USER_INFO')) { 
      next();
    } else { 
      next();
      window.location.href = '/login';
    }
  } else {
    next()
  }
})

export default router;


