import app from './modules/app'
import layout from './modules/layout'
import demo from './modules/demo'
import getters from './getters'
const store = new Vuex.Store({
  modules: {
    demo,
    app,
    layout
  },
  strict: process.env.NODE_ENV !== 'production',
  getters
})
export default store
