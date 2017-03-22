/**
 * api接口
 * 以插件形式存在
 */
export default class Rest {
  static install () {}
  constructor(options = {}) {
    Object.assign(this, options.rest)
  }
}

function install(Vue) {
  if (install.installed) return
  install.installed = true
  Vue.mixin({
    beforeCreate() {
      const options = this.$options
      if (options.rest) {
        this.$rest = options.rest
      } else if (options.parent && options.parent.$rest) {
        this.$rest = options.parent.$rest
      }
    }
  })
}

Rest.install = install
Rest.version = '__VERSION__'
