/**
 * Created by hq5544 on 16/3/26.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    mutations,
    modules: {}
})

export default store
