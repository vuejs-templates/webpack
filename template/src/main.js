// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import pagodaComponents from 'pagoda-ui'
import router from './router'

import custom from './components/custom'

pagodaComponents.formGroup.registerComponents({
  'bdc-select': {
    component: pagodaComponents.bdcSelect
  }
})
Vue.use(ElementUI, { size: 'small' })
pagodaComponents.erpTable.projectName = pagodaComponents.bdcSelect.projectName = pagodaComponents.erpForm.projectName = 'test'
Vue.use(pagodaComponents)

pagodaComponents.tableEditItem.registerComponents({
  custom
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
