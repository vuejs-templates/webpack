import Vue from 'vue'
import Router from 'vue-router'
// 同步路由参数
import {
  sync
} from 'vuex-router-sync'
// vuex 仓库
import store from '../vuex/store'
// 缓存处理
import cache from '../common/cache'
// url处理
import url from '../common/url'
// 路由配置
import routeConfig from './config'

Vue.use(Router)
// 缓存store_id
saveStoreId()

// 构造路由
let router = new Router(routeConfig)
  // 路由钩子
  // S 转场动画
let historyCount = cache.getSessionData('count') * 1 || 0
cache.setSessionData('/', 0)
const commit = store.commit || store.dispatch
router.beforeEach((to, from, next) => {
  let meta = to.meta || {}
    // 路由变化，修改title
  if (meta && meta.title) {
    changeTitle(meta.title)
  }
  // 转场动画方向控制
  const toIndex = cache.getSessionData(to.path)
  const fromIndex = cache.getSessionData(from.path)
  if (toIndex) {
    if (toIndex > fromIndex) {
      commit('UPDATE_DIRECTION', 'forward')
    } else {
      commit('UPDATE_DIRECTION', 'reverse')
    }
  } else {
    ++historyCount
    cache.setSessionData('count', historyCount)
    to.path !== '/' && cache.setSessionData(to.path, historyCount)
    commit('UPDATE_DIRECTION', 'forward')
  }
  // loading 动画
  if (meta && meta.needLoading) {
    store.commit('UPDATE_LOADING', {
      status: true,
      text: '加载中...'
    })
  }
  next()
})
sync(store, router)
  // E 转场动画

// 页面渲染完毕后关闭loading
router.afterEach(function (to) {
  if (to.meta && to.meta.needLoading) {
    window.setTimeout(() => {
      store.commit('UPDATE_LOADING', {
        status: false
      })
    }, 1000)
  }
})

// 修改title
function changeTitle(title, src) {
  let tagTitle = document.getElementsByTagName('title')[0]
  tagTitle.innerText = title
  let iframe = document.createElement('iframe')
  iframe.src = '/static/favicon.ico'
  iframe.style.visibility = 'hidden'
  iframe.style.width = '1px'
  iframe.style.height = '1px'
  iframe.onload = function () {
    setTimeout(function () {
      document.body.removeChild(iframe)
    }, 0)
  }
  document.body.appendChild(iframe)
}
// 缓存storeId
function saveStoreId() {
  let storeId = url.getSearch().store_id || ''
  if (storeId) {
    cache.setLocalStorageData(cache.keyMap.CACHE_STORE_ID, storeId)
  }
}

export default router
