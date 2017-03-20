import VueRouter from 'vue-router'
import routerConf from './router'
import {SystemEvent, MSG} from '../events/systemEvent'
const routes = [
    {
        path: routerConf.root,
        component(resolve) {
            // require(['components/active1'], resolve)
        }
    }
];
const router = new VueRouter({
    // mode: 'history',//IOS低版本要开启history模式
    routes,
    transitionOnLoad: false
});
router.beforeEach((to, from, next) => {
    SystemEvent.emit(MSG.ROUTER_BEFORE);
    setTimeout(next, 200);
});
router.afterEach(() => {
    console.log('完成');
    SystemEvent.emit(MSG.ROUTER_AFTER);
});
export default router;
