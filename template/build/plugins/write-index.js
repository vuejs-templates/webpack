const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = (config) => {

    return new WriteFilePlugin({
        test:  /generated-assets-files\.json$/,
        force: true,
        log: false
    });
};
