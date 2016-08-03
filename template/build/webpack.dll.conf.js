/**
 * Created by su9er on 16/7/28.
 */
const webpack = require('webpack'); //
const path    = require('path'); //

const vendors = [
  'vue',
  'vue-resource',
  'vue-router'
];

module.exports = {
  entry  : {
    vendors: vendors
  },
  output : {
    path    : path.resolve(__dirname, '../dll/js'),
    filename: '[name]_[chunkhash].js',
    /**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.vendors_library`
     */
    library : '[name]_library'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DllPlugin({
      /**
       * path
       * 定义 manifest 文件生成的位置
       * [name]的部分由entry的名字替换
       */
      path   : path.resolve(__dirname, '../dll/[name]_manifest.json'),
      /**
       * name
       * dll bundle 输出到那个全局变量上
       * 和 output.library 一样即可。
       */
      name   : '[name]_library',
      context: __dirname
    })
  ]
}
