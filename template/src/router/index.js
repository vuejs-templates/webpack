import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import('../views/home')
  },
  {
    path: '/demo1',
    component: () => import('../views/demo1')
  },
  {
    path: '/demo2',
    component: () => import('../views/demo2')
  }
]

// 在懒加载完成之后将【路由名】设置为当前路由对应组件的【组件名】，保持统一，方便管理维护
routes.forEach(route => {
  const routeLoader = route.component

  route.component = function (resolve) {
    routeLoader().then(module => {
      route.name = module.default.name

      resolve(module)
    })
  }
})

export default new Router({
  routes
})
