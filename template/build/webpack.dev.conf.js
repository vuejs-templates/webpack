var config = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// eval-source-map is faster for development
config.devtool = 'eval-source-map'

config.devServer = {
  // allow access over local network
  host: '0.0.0.0',
  // enable HTML5 history routing
  historyApiFallback: true,
  // suppress useless text
  noInfo: true,
}

// necessary for the html plugin to work properly
// when serving the html from in-memory
config.output.publicPath = '/'

config.plugins = (config.plugins || []).concat([
  // generate HTML on the fly
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html'
  })
])

module.exports = config
