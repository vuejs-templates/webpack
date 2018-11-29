import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
const component =  {
  template: '<router-view></router-view>'
};
const path = [
  {
    path: '/',
    name: 'index',
    component HelloWorld
  }
];
Vue.use(Router);
const router = new Router({
  routes: path,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});
export default router;
