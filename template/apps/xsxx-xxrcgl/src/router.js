import Vue from 'vue';
var VueRouter = require('vue-router');

Vue.use(VueRouter);

var router = new VueRouter();
router.map({
    '/': {
        component (resolve) {
            require(['./pages/Main.vue'], resolve);
        }
    }
});

export default router;
