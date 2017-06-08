var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
// 接收运行参数
const argv = require('yargs')
    .describe('debug', 'debug 环境') // use 'webpack --debug'
    .argv;
let publicPath = config.dev.assetsPublicPath;
if (process.env.NODE_ENV === 'production') {
    publicPath = config.build.assetsPublicPath;
    if (argv.debug) {
        publicPath = config.test.assetsPublicPath;
    }
}
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: publicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: [
            resolve('src'),
            resolve('node_modules')
        ],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'src$': resolve('src'),
            'assets$': resolve('src/assets'),
            'components$': resolve('src/components'),
            'util$': resolve('src/util'),
            'define$': resolve('src/define'),
            'view$': resolve('src/view')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: "pre",
                include: [resolve('src'), resolve('test')],
                options: {
                    formatter: eslintFriendlyFormatter
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        name: utils.assetsPath('images/[name].[hash:7].[ext]')
                    }
                },
                    {
                        loader: 'img-loader',
                        options: {
                            enabled: process.env.NODE_ENV === 'production',
                            gifsicle: {
                                interlaced: false
                            },
                            mozjpeg: {
                                progressive: true,
                                arithmetic: false
                            },
                            optipng: false, // disabled
                            pngquant: {
                                floyd: 0.5,
                                speed: 2
                            },
                            svgo: {
                                plugins: [
                                    {removeTitle: true},
                                    {convertPathData: false}
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp3|mp4)(\?.*)?$/,
                loader: 'file-loader',
                query: {
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}
