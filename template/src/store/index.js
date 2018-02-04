/**
 * Created by nocoolyoyo on 2018/1/8.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// export default Vuex.Store
const defaults = {
  state: {
    count: 0,
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
}
export default  function store(options) {
  return new Vuex.Store(options)
}
