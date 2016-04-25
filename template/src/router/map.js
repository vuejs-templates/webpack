/**
 * Created by hq5544 on 16/3/26.
 */
const map = {
    // /index
    '/index': {
        name: 'index',
        title: 'demo',
        footer: false, // 是否显示底部切换栏
        component (resolve) {
            require(['../views/index/index.vue'], resolve)
        }
    }
}

const alias = {
    '/': '/index'
}

export default {
    map,
    alias
}
