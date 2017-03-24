/**
 * api 接口
 */
import Vue from 'vue'
// api 插件
import Rest from '../plugins/rest'
// api 配置
import config from './config'
Vue.use(Rest)
// rest
export default new Rest({
  rest: config
})
