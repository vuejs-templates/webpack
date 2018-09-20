const app = {
  namespaced: 'app',
  state: {
    pageLoading: false,
    TabORCrumb: 'tab', // tab:标签页，crumb：面包屑
    CrumbArr: ['工单系统', '审批管理', '发起审批']
  },
  actions: {
  },
  mutations: {
    updateState (state, payload) {
      state = Object.assign(state, payload)
    }
  }
}

export default app
