const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (config) => {

    const vueConfig = {
        test:    /\.vue$/,
        loader:  'vue-loader',
        options: {
            loaders: {},
            postcss: [
                require('autoprefixer')({
                    browsers: ['last 2 versions']
                })
            ]
        }
    };


    // Build : Sortir les styles dans des fichiers
    if (config.env == 'build') {
        vueConfig.options.loaders = {
            css:  ExtractTextPlugin.extract({
                use:      'css-loader',
                fallback: 'vue-style-loader',
            }),
            less: ExtractTextPlugin.extract({
                use:      'css-loader!less-loader',
                fallback: 'vue-style-loader',
                publicPath: ''
            })
        };
    }

    // Dev
    else {
        vueConfig.options.loaders = {
            css:  'vue-style-loader!css-loader',
            less: 'vue-style-loader!css-loader!less-loader'
        }
    }


    return vueConfig;

};
