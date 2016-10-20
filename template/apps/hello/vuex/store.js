import Vuex from 'vuex';

const state = {
    catagories: []
};

const mutations = {
    CATAGORY_LIST (state, catagories) {
        state.catagories = catagories;
    }
};

export default new Vuex.Store({
    state,
    mutations
});
