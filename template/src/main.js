// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入element-ui 作为依赖
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import pagodaBaseComponents from 'pagoda-ui/base-components'

import 'pagoda-ui/src/style/reset.styl'
import 'pagoda-ui/src/theme/theme1.scss'

Vue.use(pagodaBaseComponents)
Vue.use(ElementUi, {size: 'mini'})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
