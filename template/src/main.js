import Vue from 'vue';
import App from 'app/App';
import router from 'router/routes.js';
import {TweenLite} from "gsap";


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
});
