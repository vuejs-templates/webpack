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
    csslibs: [], // 在index.html中需要引入的 css lib
    jslibs: [ // 在 index.html 中需要引入的 js lib， vue 和 router 必须引入
        'http://res.wisedu.com/bower_components/vue/dist/vue.min.js',
        'http://res.wisedu.com/bower_components/vue-router/dist/vue-router.min.js'
    ]
}
