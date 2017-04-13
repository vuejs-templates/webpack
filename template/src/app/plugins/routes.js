import Vue from 'vue';
import Router from 'vue-router';

import IndexPage from 'pages/IndexPage';


Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: IndexPage,
        },
        {
            path: '*',
            redirect: 'index'
        },
    ]
});
