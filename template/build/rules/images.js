const path = require('path');

module.exports = (config) => {
    return {
        test:   /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query:  {
            limit: 100,
            name:  'images/[name].[ext]',
        }
    };
}
