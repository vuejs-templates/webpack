import * as types from '../mutation-types'

const state = {
  loadingStatus: false,
  step: 0,
  store: {
    get (item) {
      let _obj = localStorage.getItem(item)
      let _dec
      try {
        _dec = JSON.parse(_obj)
      } catch (e) {
        _dec = null
        throw new Error(e)
      }
      return _dec
    },
    set (item, obj) {
      localStorage.setItem(item, JSON.stringify(obj))
    },
    del (item) {
      if (item) {
        return localStorage.removeItem(item)
      }
      localStorage.clear()
    }
  }
  // 1 由e投保流程进入
  // 2 app主页产品进入
  // 3 保险进度
}

const getters = {
  maskState: (state) => state.loadingStatus,
  step: (state) => state.step
}
const actions = {
  toggleLoadingStatus ({ commit, state }, bool) {
    commit(bool ? types.LOADING_SHOW : types.LOADING_HIDE)
  },
  setPressStatus ({commit, state}, step) {
    commit(types.PRESSSTATUS, step)
  }
}
const mutations = {
  [types.LOADING_SHOW] (state) {
    state.loadingStatus = true
  },
  [types.LOADING_HIDE] (state) {
    state.loadingStatus = false
  },
  [types.PRESSSTATUS] (state, step) {
    state.step = step
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
