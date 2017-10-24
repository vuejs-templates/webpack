/**
 * Created by cuppi on 2017/10/24.
 */
import Vuex from 'vuex';
import Vue from 'vue';

import rootModule from './modules/root';
import locationModule from './modules/location';
import userModule from './modules/user';
import widgetModule from './modules/widget';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    rootModule,
    locationModule,
    userModule,
    widgetModule
  }
});
