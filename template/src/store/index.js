import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const state = {
    name: '1',
    age: '',
    sex: 'boy',
    userInfo: { mobile: '12345678901' }
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {}
});

export default store;
