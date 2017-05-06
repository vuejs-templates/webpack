var merge = require('webpack-merge')
var devEnv = require('./dev.env');
var _resourceDomain = "http://static.tcy365.org:1505";
var _resourcePath = "/mobile/{{assetsPath}}/"
module.exports = merge(devEnv, {
    NODE_ENV: '"test"',
    assetsPublicPath: _resourceDomain + _resourcePath
});
