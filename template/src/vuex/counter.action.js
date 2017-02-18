/**
 * 方便起见，可以在此文件中统一定义所有的 actions 和 getters；
 * 当然，也可以分为action和getters文件，随意。。
 */

export const incrementCounter = ({ dispatch, state }) => {
    dispatch('INCREMENT', 1)
};

export const decrementCounter = ({ dispatch, state }) => {
    dispatch('DECREMENT', 1)
};

export const getCount = state => state.count;
