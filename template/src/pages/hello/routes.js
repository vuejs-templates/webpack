/**
 * 页面内路由定义
 */
export default {
    '/': {
        title: '首页',
        component: (resolve) => {
            require(['./hello'], resolve);
        }
    }
}
