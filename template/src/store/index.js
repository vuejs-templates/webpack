import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    text: null
  },
  actions: {
    setText (store, text) {
      store.commit('text', text)
    }
  },
  mutations: {
    text (state, text) {
      state.text = text
    }
  },
  getters: {
    text: state => {
      return state.text
    }
  }
})
