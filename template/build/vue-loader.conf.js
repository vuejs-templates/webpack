var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'
var px2rem = require("postcss-plugin-px2rem");
var postCssConf = require("../config/postcss");
module.exports = {
    loaders: utils.cssLoaders({
        sourceMap: isProduction
            ? config.build.productionSourceMap
            : config.dev.cssSourceMap,
        extract: isProduction
    }),
    postcss: [
        require('autoprefixer')({
            browsers: ['last 2 versions']
        }),
        px2rem(postCssConf)
    ]
}
