import {
    MENU_LIST,
    CATAGORY_LIST
} from '../mutation-types';

// initial state
const state = {
    'all': [],
    'cats': []
};

// mutations
const mutations = {
    [MENU_LIST] (state, menus) {
        state.all = menus;
    },
    [CATAGORY_LIST] (state, cats) {
        state.cats = cats;
    }
};

export default {
    state,
    mutations
};
