// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import utils from './utils/index'
import viewConfig from './table-config/index'
import services from '@/services'
import ElementUI from 'element-ui'
// 新ui引入后旧版的样式可以不引人
// import 'element-ui/lib/theme-chalk/index.css'
import pagodaComponents from 'pagoda-ui'
import commonComponents from 'components'
import inputRange from '@/components/input-range'
// 2018-5-7 11:13:59 新增mock本地开发调试
import 'mock-data'
// 引入公用样式
import '@/assets/stylus/index.styl'

// 引入主题和样式重置的ui
import 'pagoda-ui/src/style/reset.styl'
import 'pagoda-ui/src/components/erp/element-ui-reset.scss'


pagodaComponents.rowBtns.config = {
  default: {
    type: 'info',
    props: {
      plain: true
    }
  },
  '查询': {
    type: 'primary'
  },
  '保存': {
    type: 'primary'
  }
}

pagodaComponents.formGroup.registerComponents({
  'bdc-select': {
    component: pagodaComponents.bdcSelect
  },
  'input-range': {
    component: inputRange
  }
})

pagodaComponents.editItem.registerComponents({
  'remark': {
    component: pagodaComponents.remarkCell,
    validateEvent: 'change', // 设置默认触发校验事件
    getDefaultProps () { // 设置默认props
      return {
        editable: false
      } // 设置默认props
    }
  },
  'bdc-select': {
    component: pagodaComponents.bdcSelect
  }
})

pagodaComponents.tableEditItem.registerComponents({
  'bdc-select': {
    component: pagodaComponents.bdcSelect
  }
})

Vue.use(utils) // http 请求相关
Vue.use(services) // 公用业务逻辑service 请求相关
Vue.use(ElementUI, { size: 'mini' })
pagodaComponents.erpTable.redirectUrl = 'xxx' // 登录超时，跳转单点登录链接
pagodaComponents.erpForm.projectName = pagodaComponents.erpTable.projectName = 'erp_store' // project名称
pagodaComponents.bdcSelect.redirectUrl = 'xxx' // 登录超时，跳转单点登录链接
Vue.use(pagodaComponents)
Vue.use(commonComponents) // 公用的组件

Vue.config.productionTip = false

Vue.prototype.$viewConfig = viewConfig

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
