import { APISERVER } from '@/api'
const demo = {
  namespaced: 'demo',
  state: {
    list: [],
    totalRecords: 0
  },
  actions: {
    // 查询接口
    getOperatingActivityList: ({ commit }, opt) => {
      APISERVER(opt).then(function (res) {
        commit('updateState', {
          list: JSON.parse(res.resultList),
          totalRecords: res.totalRecords
        })
      })
    }
  },
  mutations: {
    updateState (state, payload) {
      state = Object.assign(state, payload)
    }
  }
}

export default demo
