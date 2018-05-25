import * as types from '../mutation-types'
import store from '../store'

const state = {
  loading: {},
  error: null
}

const mutations = {
  [types.MAIN_SET_LOADING_STATUS] (state, payload) {
    state.loading = {...state.loading, payload}
    if (payload) state.error = null
  },
  [types.MAIN_SET_ERROR_STATUS] (state, payload) {
    state.error = payload
  }  
}

const actions = {
  useServer: ({ commit }, {url, method, params, data, calback}) => {
    commit(types.MAIN_SET_LOADING_STATUS, true)
    axios({method, url, data, params}).then(response => {
      store.actions[calback](response.data)
    })
  }
}

const getters = {
  currentUser: state => state.main
}

export default {
  state,
  mutations,
  actions,
  getters
}
