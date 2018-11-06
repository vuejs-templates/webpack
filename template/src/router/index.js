import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index'

import {
  Message
} from 'element-ui'

import {
  getPermission
} from "../utils/get-application-permission";

let nestedRoutes = {}

let routeOptions = (r => r.keys().map(sourcePath => {
  const route = r(sourcePath).default
  const routePath = sourcePath.replace('.', '').replace('index.vue', '').replace('.vue', '')

  if(route.nestedRoute) {
    nestedRoutes[routePath] = []
  }

  return {
    name: route.name,
    path: routePath,
    component: route,
    children: nestedRoutes[routePath] || []
  }
}))(require.context('../views', true, /\.vue$/))

routeOptions = routeOptions.filter(option => {
  for(const [nestedRoutesPath, nestedRoutesChildren] of Object.entries(nestedRoutes)) {
    if(option.path.length > nestedRoutesPath.length && option.path.indexOf(nestedRoutesPath) === 0) {
      nestedRoutesChildren.push({
        name: option.name,
        path: option.component.nestedRouteIndex ? '' : option.path.replace(nestedRoutesPath, ''),
        component: option.component
      })

      return false
    }

    return true
  }
})

console.log(routeOptions, nestedRoutes)

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'INDEX',
      component: index
    },
    ...routeOptions
  ]
})

router.beforeEach(async (to, form, next) => {
  const permission = await getPermission()

  if(permission[to.name]){
    to.meta.permission = permission[to.name]

    next()
  }else{
    Message.error('没有访问权限')
  }
})

export default router
