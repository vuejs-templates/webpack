export default {
  //开启命名控件的方式
  // namespaced: true,
  state:{
    commonCount:0
  },
  mutations: {
    commonIncrement (state) {//在大多数情况下，payload载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读
      state.commonCount +=1
    }
  },
  actions:{
    commonIncrement ({ commit },increment) {
      commit('commonIncrement',increment)}
    },
}
