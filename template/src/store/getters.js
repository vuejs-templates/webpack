import getSideMenu from '@/mockData/sideMenu.json'
export default {
  sideMenu: state => { // 侧边栏菜单根据role变化
    return getSideMenu(state.role.name)
  },
  // 2018-5-22 11:24:26 过滤子菜单数组对象，获取所有菜单没有权限的对象{'菜单路由name': disabled}
  navNoPermission: (state, getters) => {
    let navNoPermission = {}
    getters.sideMenu.forEach(side => {
      side.subMenu.forEach(sub => {
        navNoPermission[sub.url] = sub.disabled
      })
    })
    return navNoPermission
  }
}
