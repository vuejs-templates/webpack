/**
 * 单一状态树
 * vuex 操作顺序：state.js -> mutations-type.js -> mutations.js -> getters.js
 */

const state = {
  //负责人
  LEADER_CONTACT_CASE: '',
  SELECT_LEADER_CONTACT_CASE: '',
  COMMON_PERSON_SELECT_CACHE: '',
  COMMON_LEADER_SELECTED_CACHE: '',
  //相关人
  COMMON_ABOUT_SELECTED_CACHE: '',
  //@人
  AT_PERSON_STATE:'',
  AUTH_URL: '',
  USER: {
    id: null
  }
}

export default state
