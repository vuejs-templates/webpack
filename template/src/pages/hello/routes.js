/**
 * 页面内路由定义
 */
const hello = resolve => require(['./hello'], resolve)

export default [
    {
        path: '/',
        component: hello,
        meta: {title: '首页'}
    }
]
