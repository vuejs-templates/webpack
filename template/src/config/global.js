/**
 * 全局参数配置
 */

module.exports = {
    proxy: { // DEV 模式下访问后端 api 时防止跨域使用的代理
        "/wec-smmp-app": "http://wecloud.wisedu.com/wec-smmp-app"
    }
}
