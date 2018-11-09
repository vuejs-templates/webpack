const Vuex = require('Vuex');
const store = newx Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
          state.count++
        }
      }
})
export default store;