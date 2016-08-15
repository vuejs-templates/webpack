import {
    MENU_LIST
} from '../mutation-types';

// initial state
const state = {
    'all': {}
};

// mutations
const mutations = {
    [MENU_LIST] (state, menus) {
        state.all = menus;
    }
};

export default {
    state,
    mutations
};
