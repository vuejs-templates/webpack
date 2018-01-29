import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import state from './state'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
	mutations,
	state,
	getters
})

export default store