import Vue from 'vue'
import Vuex from 'vuex'
import card from './modules/card'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    card
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
