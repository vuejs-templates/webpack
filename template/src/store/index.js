import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
import topMenu from '@/mockData/topMenu.json'

Vue.use(Vuex)

const state = {
  breadcrumb: [], // 面包屑数组
  loading: {
    show: false, // 主体路由内容的遮罩显示控制
    fullShow: false // layout全局内容的遮罩是否显示 (也可以用vue实例的$loading)
  },
  roles: [
    {id: 1, name: '采购文员', img: '/static/imgs/采购文员2.png'}, // 84ebcfd4a5f22c7b3ec55038d961a91e
    {id: 2, name: '采购经理', img: '/static/imgs/采购经理.png'},
    {id: 3, name: '采购总监', img: '/static/imgs/采购总监.png'},
    {id: 4, name: '仓管', img: '/static/imgs/仓管.png'},
    {id: 5, name: '仓管主管', img: '/static/imgs/仓管主管.png'},
    {id: 6, name: '供应商', img: '/static/imgs/供应商.png'},
    {id: 7, name: '店长', img: '/static/imgs/店长.png'},
    {id: 8, name: '会计', img: '/static/imgs/会计.png'},
    {id: 9, name: '出纳', img: '/static/imgs/出纳.png'}
  ],
  role: JSON.parse(localStorage.getItem('erp_role')) || { // 存储角色权限资料
    id: 1,
    name: '采购文员', // 采购文员 采购经理 采购总监 仓管 仓管主管
    img: '/static/imgs/采购文员2.png'
  },
  topMenu // 顶级菜单
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
