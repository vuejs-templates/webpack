// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import Vue from '../../util/vueutil.js';
import App from './index.vue';
import ElementUi from 'element-ui'; // 饿了么ui
// import moment from 'moment' /**时间插件*/
import 'babel-polyfill'; // ie打开空白页面问题
import router from './router';
import store from './store';
import {
  getCookie,
  delCookie
} from '../../util/util';
// 引入css
import 'element-ui/lib/theme-chalk/index.css';
import '../../assets/styles/reset.css'; // 公共样式
import '../../assets/styles/style.css'; // 系统自定义样式库

import * as filters from './filter';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Vue.use(ElementUi);

// Vue.filter('mymoment', function (el, ff, str) {
//   if (el) {
//     return moment(el).format(ff);
//   } else {
//     return str || "--";
//   }
// })
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  // template: '<App/>',
  // components: {
  //   App
  // },
  render: h => h(App)
});
