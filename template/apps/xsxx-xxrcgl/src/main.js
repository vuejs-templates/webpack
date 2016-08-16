import Vue from 'vue';
import App from './App';
import router from './router';

new Vue({
    el: document.documentElement,
    data () {
        return {
            winTitle: '学生基本信息管理'
        };
    }
});

router.start(App, '#app');
