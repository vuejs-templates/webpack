
import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);


const store = new Vuex.Store({
    modules: {

    },
  //不要在发布环境下启用严格模式！严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。
    strict: process.env.NODE_ENV !== 'production', //是否开启严格模式
  });


export default store