/**
 * vuex 状态管理
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  loading: {
    status: false,
    text: '',
    time: 0
  },
  direction: 'forward',
  toast: {
    show: false,
    text: '',
    time: 1000
  },
  authPrefix: 'replacing_auth/'
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations: {
    UPDATE_LOADING (state, loading) {
      state.loading = Object.assign({}, state.loading, loading)
    },
    UPDATE_DIRECTION (state, direction) {
      state.direction = direction
    },
    UPDATE_TOAST (state, toast) {
      state.toast = toast
    }
  }
})
