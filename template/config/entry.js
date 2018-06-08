let HtmlWebpackPlugin = require('html-webpack-plugin')
let path = require('path')
let config = require('../config')

// let entry = [
//     {
//         "key": "app",
//         "entry": ['babel-polyfill', './src/application/main/main.js'],
//         "filename": "login.vue",
//         "template": "login.vue",
//         "prdHtmlWebpackPlugin": "../dist/login.vue",
//         "chunks": ['manifest','vendor', "app"]
//     },
//     {
//         "key": "share",
//         "entry": ['babel-polyfill', './src/application/share/main.js'],
//         "filename": "share.html",
//         "template": "login.vue",
//         "prdHtmlWebpackPlugin": "../dist/share/login.vue",
//         "chunks": ['manifest','vendor', "share"]
//     }
// ]
let entry = require('./entry.json')

let entryfilter = function (obj) {
    let etr = {}
    obj.map((v, i, a) => {
        etr[v.key] = v.entry
    })
    return etr
}

let plugins = function (obj) {
    return obj.map((v, i, a) => {
        return new HtmlWebpackPlugin({
            filename: v.filename,
            template: v.template,
            inject: true,
            chunks: [v.key]
          })
    })
}

let prdConf = function (obj) {
    let build = {}
    obj.map((v, i, a) => {
        build[v.key] = path.resolve(__dirname, v.prdHtmlWebpackPlugin)
      })
    return build
}

let prdPlugins = function (obj) {
    return obj.map((v, i, a) => {
        return new HtmlWebpackPlugin({
                  filename: process.env.NODE_ENV === 'testing'
                    ? v.filename
                    :path.resolve(__dirname, v.prdHtmlWebpackPlugin),
                    // : config.build[v.key],
                  template: v.template,
                  inject: true,
                  minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                  },
                  chunksSortMode: 'dependency',
                  chunks: v.chunks
                })
            })
}
let ex = {
    entry: entryfilter(entry),
    devPlug: plugins(entry),
    prdConf: prdConf(entry),
    prdPlug: prdPlugins(entry)
}
module.exports = ex
