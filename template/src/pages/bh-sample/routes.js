/**
 * 页面内路由定义
 */
export default {
    '/': {
        title: 'BhVue',
        component: (resolve) => {
            require(['./bhSample'], resolve);
        }
    }
}
