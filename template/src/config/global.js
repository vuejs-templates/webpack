/**
 * 全局参数配置
 */

module.exports = {
    proxy: { // DEV 模式下访问后端 api 时防止跨域使用的代理
        "/wec-smmp-app": "http://wecloud.wisedu.com/wec-smmp-app"
    },
    alias: { // 自定义webpack依赖的别名，默认已支持 src/pages/config
        'components': 'src/components',
        'api': 'src/config/api',
        'services': 'src/services',
        'vuex': 'src/vuex',
        'statics': 'src/statics',
        'res': 'src/statics/resources',
        'img': 'src/statics/resources/img'
    },
    babelDir: [/bh-vue/], // 指定允许使用babel-loader编译的文件目录或路径匹配，默认已支持src
    loaders: [], // 增加其他文件类型的loader，默认已支持 vue
    csslibs: ['http://jquery/jquery.css'], // 在index.html中引入更多 css lib
    jslibs: ['http://jquery/jquery.js'] // 在index.html中引入更多 js lib
}
