var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'
{{#ProjectType}}
var px2rem = require("postcss-plugin-px2rem");
{{/ProjectType}}
var postCssConf = require("../config/postcss");
module.exports = {
    loaders: utils.cssLoaders({
        sourceMap: isProduction
            ? config.build.productionSourceMap
            : config.dev.cssSourceMap,
        extract: isProduction
    }),
    postcss: [
        {{#ProjectType}}
        require('autoprefixer')(),
        {{/ProjectType}}
        px2rem(postCssConf)
    ]
};
