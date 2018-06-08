/*
* @Author: jankergg
* @Date:   2018-05-29 16:53:58
* @Last Modified by:   jankergg
* @Last Modified time: 2018-06-08 11:30:38
TODO:完善页面跳转流程
*/
const state = {
  insList: null,
  stepSchedule: {
  },
  steps: []//
}

const getters = {
  getInsList (state) {
    return state.insList
  },
  steps (state) {
    return state.steps
  }
}

const actions = {
  setInsList ({ commit, state }, n) {
    commit('insList', n)
  },
  setSteps ({ commit, state }, n) {
    commit('setSteps', n)
  }
}
const mutations = {
  insList (state, n) {
    state.insList = n
  },
  setSteps (state, n) {
    state.steps = n
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
