/**
 * 全局唯一 store，做状态共享
 */
Vue.use(Vuex);

// 应用状态
const state = {
    count: 0
};

// 状态变更函数
const mutations = {
    // mutation 的第一个参数是当前的 state
    // 你可以在函数里修改 state
    INCREMENT (state, amount) {
        state.count = state.count + amount
    },
    DECREMENT (state, amount) {
        state.count = state.count - amount
    }
};

export default new Vuex.Store({
    state,
    mutations
});
