import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import('../views/home')
  },
  {
    path: '/main',
    component: () => import('../views/main')
  },
  {
    path: '/main/detail1',
    component: () => import('../views/detail1')
  },
  {
    path: '/detail2',
    component: () => import('../views/detail2'),
    meta: {
      // 标志当前路由跳转需要打开新的标签页
      tabConfig: {
        tabName (to, from) {
          return `查看详情-${to.query.index}`
        }
      }
    }
  }
]

export default new Router({
  routes
})
