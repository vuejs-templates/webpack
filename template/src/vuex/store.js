import Vue from 'vue'
import Vuex from 'vuex'
//判断是否登录
import isLogin from './isLogin'
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        isLogin
    }
});
export default store
