import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
// import module from './modules/module';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
if(debug) {
  console.warn(`🐱: Vuex is in STRICT mode as NODE_ENV is set to "${process.env.NODE_ENV}".\n
All commits are syncronously watched. Any performance lag is due to this.`);
}

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    // module
  },
  strict: debug
});