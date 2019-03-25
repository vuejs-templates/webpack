// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入element-ui 作为依赖
import ElementUi from 'element-ui'

import pagodaLayoutComponents from 'pagoda-ui-test/layout-components'
import pagodaButtonComponents from 'pagoda-ui-test/button-components'
import pagodaFormComponents from 'pagoda-ui-test/form-components'
import pagodaDataComponents from 'pagoda-ui-test/data-components'

import 'pagoda-ui-test/src/theme/theme1.scss'
import 'pagoda-ui-test/src/theme/ui-reset.scss'

pagodaFormComponents.formGroup.registerComponents({
  province: {
    component: pagodaFormComponents.province
  },
  city: {
    component: pagodaFormComponents.city
  },
  district: {
    component: pagodaFormComponents.district
  }
})

pagodaButtonComponents.rowBtns.config = {
  default: {
    type: 'info',
    props: {
      plain: true
    }
  },
  '查询': {
    type: 'primary',
    props: {
      plain: false
    }
  },
  '保存': {
    type: 'primary',
    props: {
      plain: false
    }
  }
}

Vue.use(pagodaLayoutComponents)
Vue.use(pagodaFormComponents)
Vue.use(pagodaDataComponents)
Vue.use(pagodaButtonComponents)
Vue.use(ElementUi, {size: 'small'})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
