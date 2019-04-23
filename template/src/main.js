// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入element-ui 作为依赖
import ElementUi from 'element-ui'

import pagodaComponents from 'pagoda-ui'

import 'pagoda-ui/src/theme/theme1.scss'
import 'pagoda-ui/src/theme/ui-reset.scss'

ElementUi.Button.config = {
  default: {
    type: 'info',
    plain: true
  },
  '查询': {
    type: 'primary'
  },
  '保存': {
    type: 'primary'
  }
}

Vue.use(pagodaComponents)
Vue.use(ElementUi, {size: 'small'})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
