/**
 * 页面内路由定义
 */
export default {
    '/': {
        title: '世界',
        component: (resolve) => {
            require(['./world'], resolve);
        }
    }
}
