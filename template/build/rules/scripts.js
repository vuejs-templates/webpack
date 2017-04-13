const {resolve} = require('../utils/utils');

module.exports = (config) => {
    return {
        test:    /\.js$/,
        loader:  'babel-loader',
        include: [
            resolve('src'),
            resolve('test')
        ]
    };
}
