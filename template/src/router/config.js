/**
 * 路由
 */
import StoreIndex from './store/Index' // 4s店首页
export default {
  routes: [{
    path: '/',
    redirect: '/store/index'
  }, { // 4s店首页
    path: '/store/index',
    component: StoreIndex,
    meta: {
      title: '首页',
      needLoading: true
    }
  }]
}
