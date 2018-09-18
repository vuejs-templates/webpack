/*
 * @Author: zhangxiang
 * @Date: 2018/9/18
 * @Last Modified by: zhangxiang
 * @Last Modified time: 2018/9/18
 */
import Vue from 'vue'
import Vuex from 'vuex'
import demo from './modules/demo'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    demo
  }
})
