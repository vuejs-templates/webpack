// 根级别的 action
// 封装复杂的 mutations
import { removeFromUrl } from '../utils/auth'

/**
 * 保存搜索历史
 * @param  {[type]} query          搜索关键词
 */
// export const saveHistory = function ({commit}, query) {
//   commit(types.SET_SEARCHHISTORY, localSave(query))
// }
export const FedLogOut = function ({commit}, query) {
  return new Promise(resolve => {
    commit('USER', {id: null})
    removeFromUrl()
    resolve()
  })
}
