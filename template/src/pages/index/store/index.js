import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    activeView: {},
    activeDataitem: {}
  },
  mutations: {
    changeActiveView(state, val) {
      state.activeView = val;
    },
    changeActiveDataitem(state, val) {
      state.activeDataitem = val;
    }
  },
  actions: {

  }
});
export default store;
