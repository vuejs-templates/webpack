var config = require('./webpack.base.conf')

config.devtool = 'eval-source-map'

config.devServer = {
  host: '0.0.0.0',
  historyApiFallback: true,
  noInfo: true
}

module.exports = config
