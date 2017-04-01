var merge = require('webpack-merge')
var devEnv = require('./dev.env')
module.exports = merge(devEnv, {
    NODE_ENV: '"testing"',
    _resourceDomain: "http://static.tcy365.org:1505",
    _resourcePath: "/mobile/{{#assetsPath}}/",
    assetsPublicPath: this._resourceDomain + this._resourcePath
});
