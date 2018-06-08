const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const packageJSON = require('../package.json')
let vendors = Object.keys(packageJSON.dependencies || []);

module.exports = {
  entry: {
    vendor: vendors
  },
  output: {
    path: path.join(__dirname, "../dist/static/js"),
    filename: "[name].dll.js",
    library: "[name]_library"
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "../dist/dll", "[name]_manifest.json"),
      name: "[name]_library",
      // context: __dirname
      context: path.resolve(__dirname, '..')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
