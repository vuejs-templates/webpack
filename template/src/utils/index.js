import { instance, $ajax, $get, $post } from './http'
export default {
  install (Vue, options) {
    /**
     * 注册http
     */
    Vue.prototype.$http = instance
    Vue.prototype.$ajax = $ajax
    Vue.prototype.$get = $get
    Vue.prototype.$post = $post
  }
}
