import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import fastclick from "fastclick";
import throttle from "./util/throttle";
import appInterFace from "./util/appInterFace"
import axios from "axios";

{{#router}}
import VueRouter from "vue-router";
import router from "./router/routerInstance";
{{/router}}
import base from "assets/js/common";

{{#router}}
Vue.use(VueRouter);
{{/router}}

fastclick.attach(document.body);

//采用了节流函数
window.addEventListener('scroll', throttle(()=>{

}, 200));

if (appInterFace.getHeaderInfo()) {
    var headStr = appInterFace.getHeaderInfo();
    var params = JSON.parse(headStr);
    try {
        for (var k in params) {
            axios.defaults.headers[k] = params[k];
        }
    } catch (e) {
        console.log(e)
    }
}
Vue.config.errorHandler = function (err, vm) {
    console.log(err);
};

new Vue({
{{#router}}
    router,
    {{/router}}
    template: '<App/>',
    components: {App}
}).$mount('#app');
