import App from './App'
import router from './router'
import store from './store'
import './directives'
import components from './components'
import Mixin from './mixin'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/index.scss'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 把空的Vue实例作为中央事件总线放到全局,通过此属性可进行兄弟组件之间通信
Vue.prototype.hub = new Vue()
// import Token from './utils/token'
// 单点登陆
// Vue.use(Token)
// Token.getUser((we) => {
//   console.log(we)
// })
// Token.initEvents()

// 全局引入所有公共组件
Vue.use(components)
NProgress.configure({ showSpinner: false })
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
router.afterEach(() => {
  NProgress.done() // finish progress bar
})

Vue.config.productionTip = false
Vue.prototype.$ELEMENT = { size: 'medium' }
// 全局混入
Vue.mixin(Mixin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
