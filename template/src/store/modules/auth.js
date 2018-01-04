{{#axios}}
import * as authAPI from '@/api/auth'

const authToken = localStorage.authToken || ''
{{/axios}}
export default {
  state: {
    {{#axios}}authToken: authToken || ''{{/axios}}
  },
  mutations: {
    {{#axios}}
    SET_TOKEN (state, authToken) {
      state.authToken = authToken
    }
    {{/axios}}
  },
  actions: {
    {{#axios}}
    async loginByPassword ({ commit, dispatch, state }, { username, password }) {
      const { token } = await authAPI.getTokenByPassword({ username, password })
      commit('SET_TOKEN', token)
    }
    {{/axios}}
  }
}

