/**
 * vue路由辅助类，
 * 支持在运行时动态加入子级路由（基于 vue1.0 / vue-router1.0）
 */
var start = (routes, selector, callbacks) => {
    const router = new VueRouter({routes})

    // 通过route的配置设置 title
    router.afterEach(function(to, from) {
        let title = to.meta && to.meta.title
        if (title) {
            document.title = title
        }
    })

    if (callbacks) {
        callbacks.beforeEach && router.beforeEach(callbacks.beforeEach)
        callbacks.afterEach && router.afterEach(callbacks.afterEach)
    }

    new Vue({router}).$mount(selector)
}

export default start
