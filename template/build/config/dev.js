const merge      = require('webpack-merge');
const baseConfig = require('./base');

module.exports = merge(baseConfig, {
    env: 'dev'
});
