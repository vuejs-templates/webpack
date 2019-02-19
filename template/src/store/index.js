import Vue from 'vue'
import Vuex from 'vuex'
import state from './State.js'
import mutations from './mutations.js'

  Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  modules: {

  },
  strict: process.env.NODE_ENV !== 'production' // 严格模式
})
