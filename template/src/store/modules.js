import common from './common';
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
//采用的是  多个分类的形式
const myPlugin = store => {//此方式可以监控到提交的状态
  // 当 store 初始化后调用
  let prevState = _.cloneDeep(store.state)
  store.subscribe((mutation, state) => {
    let nextState = _.cloneDeep(state)
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
    console.dir(prevState)
    console.dir(nextState)
    prevState = nextState

  })
}
const logger = createLogger({
  collapsed: false, // 自动展开记录的 mutation
  filter (mutation, stateBefore, stateAfter) {
    // 若 mutation 需要被记录，就让它返回 true 即可
    // 顺便，`mutation` 是个 { type, payload } 对象
    return mutation.type !== "aBlacklistedMutation"
  },
  transformer (state) {
    // 在开始记录之前转换状态
    // 例如，只返回指定的子树
    return state
  },
  mutationTransformer (mutation) {
    // mutation 按照 { type, payload } 格式记录
    // 我们可以按任意方式格式化
    return mutation.type
  },
  logger: console, // 自定义 console 实现，默认为 `console`
})
export  default new Vuex.Store({
  modules: {
    common: common,
  },
  // plugins: [myPlugin]
  plugins: process.env.NODE_ENV !== 'production'
    ? [logger]
    : []
})
