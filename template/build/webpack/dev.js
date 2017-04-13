const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = (config) => {

    // Get Webpack base config
    const webpackConfig = require('./base')(config);


    // Add hot module reload and dev server
    webpackConfig.entry.app.unshift(
        'webpack-dev-server/client?http://localhost:8888/',
        'webpack/hot/dev-server'
    );
    webpackConfig.output.publicPath = 'http://localhost:8888/';
    webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin()
    );

    return webpackConfig;
}

