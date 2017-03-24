import Vue from 'vue'
import Wechat from '../plugins/wechat'
import config from './config'

Vue.use(Wechat)
export default new Wechat(config)
