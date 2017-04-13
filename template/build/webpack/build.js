const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (config) => {

    // Get Webpack base config
    const webpackConfig = require('./base')(config);


    // Extract CSS into file
    webpackConfig.plugins.push(
        new ExtractTextPlugin("style.css")
    );

    // CSS optimizer/minifier
    webpackConfig.plugins.push(
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                discardComments: { removeAll: true },
                reduceIdents: false  // Sinon les keyframes sont renommées. https://github.com/ben-eb/cssnano/issues/317 http://cssnano.co/optimisations/reduceIdents/
            }
        })
    );

    // Uglify scripts
    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: true,
            sourceMap: true
        })
    );

    return webpackConfig;
};
