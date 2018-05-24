import * as types from '../mutation-types'
import { user } from '../../config/url'
import store from '../store'

const state = {
  main: null
}

const mutations = {
  [types.USER_LOGIN_SET_DATA] (state, payload) {
    state.main = payload
  }
}

const actions = {
  doLogin: ({ commit }, {data}) => {
   store.actions.useServer({...user.doLogin, params = null, data, calback: response => {
    // Here we got the response
    commit(types.USER_LOGIN_SET_DATA, response)
   }})
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
