const webpack           = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (config) => {

    // Get Webpack Build config
    const webpackConfig = require('./build')(config);


    // Extract CSS files
    webpackConfig.plugins.push(
        new BundleAnalyzerPlugin()
    );

    return webpackConfig;
};
