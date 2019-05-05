import Vue from 'vue';
import Router from 'vue-router';
import axios from '../../../util/http';
Vue.use(Router);
Vue.prototype.$ajax = axios;

const router = new Router({
  routes: [{
    path: '/',
    name: 'index',
    redirect: 'home'
  }, {
    path: '/home',
    name: 'home',
    component: () =>
      import('@/views/home.vue')
  }]
});
router.beforeEach((to, from, next) => {
  next();
});
export default router;
