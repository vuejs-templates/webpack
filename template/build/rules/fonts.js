const path = require('path');

module.exports = (config) => {
    return {
        test:   /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        query:  {
            limit: 10000,
            name:  'fonts/[name].[ext]'
        }
    };
};
