import { APISERVER } from '@/api'
import utils from '@/utils/common'
import { homeTab, homeMenu } from '@/config/config'
const layout = {
  namespaced: 'layout',
  state: {
    menuData: [],
    menuActiveArr: [],
    opened: false,
    TabsList: [homeTab],
    allRouterLink: []
  },
  actions: {
    // 查询左菜单接口
    getMenuList: ({ commit, state }, opt) => {
      let def = homeMenu
      return APISERVER(opt).then(function (res) {
        def = [].concat(def, res)
        let allRouterLink = utils.getAllLinkPath(def)
        commit('updateState', {
          menuData: def,
          allRouterLink
        })
        return state.menuData
      })
    }
  },
  mutations: {
    updateState (state, payload) {
      state = Object.assign(state, payload)
    }
  }
}

export default layout
