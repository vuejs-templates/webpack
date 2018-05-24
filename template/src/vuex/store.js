import Vue from 'vue'
import Vuex from 'vuex'
import vuexLocal from './persistence'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  namespaced: true,
  strict: true,
  mutations: {
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
  },
  plugins: [vuexLocal.plugin]
})
