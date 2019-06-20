// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import store from './store';
import { AlertPlugin, ToastPlugin, ConfirmPlugin, LoadingPlugin } from 'vux';
Vue.use(AlertPlugin);
Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin);
Vue.use(LoadingPlugin);

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

console.log(process.env.BASE_API);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
});
