import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import fastclick from "fastclick";
import throttle from "./util/throttle";

{{#router}}
import VueRouter from "vue-router";
import router from "./router/routerInstance";
{{/router}}
import base from "assets/js/common";
import axios from "axios";

{{#router}}
Vue.use(VueRouter);
{{/router}}

fastclick.attach(document.body);

//采用了节流函数
window.addEventListener('scroll', throttle(()=>{

}, 200));

if (base.getAppMethod("getHeaderInfo")) {
    var headStr = base.getAppMethod("getHeaderInfo");
    var params = JSON.parse(headStr);
    try {
        params.GameAbbreviations = requestHeader.GameAbbreviations;
        for (var k in params) {
            axios.defaults.headers[k] = params[k];
        }
    } catch (e) {
        console.log()
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
