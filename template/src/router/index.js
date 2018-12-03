import Vue from 'vue'
import Router from 'vue-router'
const layout = resolve => require(['@/view/layout'], resolve)
const index = resolve => require(['@/view/index'], resolve)
const component = {
  template: '<router-view></router-view>'
}
const path = [
  {
    path: '/',
    component: layout,
    children: [
      {
        path: '/',
        component: index,
        name: 'index'
      }
    ]
  }
]
Vue.use(Router)
const router = new Router({
  routes: path,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
export default router
