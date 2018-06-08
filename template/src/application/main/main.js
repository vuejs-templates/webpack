/* - main: 程序入口
* @Author: jankergg
* @Date:   2018-05-10 10:15:40
* @Last Modified by:   jankergg
* @Last Modified time: 2018-06-07 15:00:12
*/
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import {axioshttp, jsBridge} from '@/widget'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import {translationsFan, translationsEn} from '@/language'
import { AlertPlugin, ConfirmPlugin, ToastPlugin, LoadingPlugin } from 'vformer'
import baseMixin from '../base/mixin'
import '@/widget/filter'

Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.config.devtools = true



// 点击延迟
// const FastClick = require('fastclick')
// FastClick.attach(document.documentElement)

Vue.use(vuexI18n.plugin, store)
Vue.i18n.add('FAN', translationsFan)
Vue.i18n.add('EN', translationsEn)
Vue.i18n.set('FAN')
Vue.mixin(baseMixin)

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    // 找不到页面时，重定向回第1步
    next('/adduser')
  } else {
    if (to.meta && to.meta.leftMenu){
      window.leftMenu(to.meta.leftMenu)
    }
    next()
  }
})

let app = new Vue({
  el: '#app',
  router,
  store,
  mixins: [],
  template: '<App/>',
  components: { App }
})

axioshttp(app)
window.app = app
export default app
