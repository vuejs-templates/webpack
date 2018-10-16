const app = {
  namespaced: 'app',
  state: {
    pageLoading: false,
    {{#if_eq TabORCrumb "tab"}}
    TabORCrumb: 'tab',
    {{/if_eq}}
    {{#if_eq TabORCrumb "crumb"}}
    TabORCrumb: 'crumb',
    {{/if_eq}}
    {{#if_eq TabORCrumb "none"}}
    TabORCrumb: 'none',
    {{/if_eq}}
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
