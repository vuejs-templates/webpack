/**
 * Require Browsersync along with webpack and middleware for it
 */
var webpack = require('webpack')
var browserSync = require('browser-sync')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var path = require('path')

/**
 * Require ./webpack.dev.config.js and make a bundler from it
 */
var webpackConfig = require('./webpack.dev.conf')
var bundler = webpack(webpackConfig)

/**
 * Run Browsersync and use middleware for Hot Module Replacement
 */
browserSync({
    server: {
        baseDir: webpackConfig.resolve.alias.src
    },
    middleware: [
        webpackDevMiddleware(bundler, {
            // IMPORTANT: dev middleware can't access config, so we should
            // provide publicPath by ourselves
            publicPath: webpackConfig.output.publicPath,

            // pretty colored output
            stats: {
                colors: true,
                chunks: false
            }

            // for other settings see
            // http://webpack.github.io/docs/webpack-dev-middleware.html
        }),

        // bundler should be the same as above
        webpackHotMiddleware(bundler)
    ],

    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
        path.join(webpackConfig.resolve.alias.src, '*.html')
    ]
})
