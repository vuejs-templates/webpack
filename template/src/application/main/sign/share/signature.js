import "babel-polyfill"
import '../../assets/scss/global.scss'
import Vue from 'vue'
import App from './signature.vue'
import '../../widget/filter'
import '../../widget/plugin/http'
import '../../widget/directive'
import {ToastPlugin, AlertPlugin, ConfirmPlugin} from 'vux'
import toolsMixins from '@/components/mixin/tools-mixin'
import formMixin from '@/components/mixin/form-mixin'

Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)

Vue.mixin(formMixin)
Vue.mixin(toolsMixins)

import VeeValidate from 'vee-validate'
import messagesCN from '@/widget/validate/zh_CN'
const veeConfig = {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0.5,
  locale: 'cn',
  messages: null,
  strict: true,
  dictionary: {
    cn: {
      messages: messagesCN
    }
  }
}
Vue.use(VeeValidate, veeConfig)
import '@/widget/validate/extends'

Vue.config.productionTip = false

export const rootNode = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

rootNode.axios.interceptors.request.use(
  req => req,
  req => Promise.reject(req)
)

rootNode.axios.interceptors.response.use(
  res => res,
  req => Promise.reject(req)
)

