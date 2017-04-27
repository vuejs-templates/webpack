const webpack = require('webpack');
const path    = require('path');
const utils   = require('../utils/utils');


module.exports = (config) => {
    return {

        entry: {
            app: ['./src/main.js']
        },

        output: {
            path: config.assetsPath,
            publicPath: config.assetsPublicPath + '/',
            filename: '[name].js',
        },

        resolve: {
            extensions: ['.js', '.vue', '.json'],
            modules: [
                utils.resolve('src'),
                utils.resolve('node_modules')
            ],
            alias: {
                'vue$': 'vue/dist/vue.common.js',
                'src': utils.resolve('src'),
                'components': utils.resolve('src/app/components'),
                'pages': utils.resolve('src/app/pages'),
                'plugins': utils.resolve('src/app/plugins'),
                'static': utils.resolve('src/static'),
                'styles': utils.resolve('src/styles'),
            }
        },

        module: {
            rules: utils.require('rules', config, [
                'vue',
                'scripts',
                'images',
                'fonts',
            ])
        },

        plugins: utils.require('plugins', config, [
            'spritesmith',
            'write-index',
            'create-index',
        ]),
    };
};
