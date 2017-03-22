/**
 * api 接口
 */
import Vue form 'vue'
// vue-resource 封装的代码
import VueResource from 'vue-resource'
// api 插件
import Rest from '../plugins/rest'
// api 配置
import config from './config'
Vue.use(Rest)
// rest
export default new Rest({
  rest: config
})
