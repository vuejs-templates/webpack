var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function (options) {
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    var sourceLoader = loaders.map(function (loader) {
      var extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    if (options.extract) {
      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
    } else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  }

  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
  return [
    {
      key: 'css',
      value: generateLoaders(['css'])
    },
    {
      key: 'less',
      value: generateLoaders(['css', 'less'])
    },
    {
      key: 'sass',
      value: generateLoaders(['css', 'sass?indentedSyntax'])
    },
    {
      key: 'scss',
      value: generateLoaders(['css', 'sass'])
    },
    {
      key: 'stylus',
      value: generateLoaders(['css', 'stylus'])
    },
    {
      key: 'styl',
      value: generateLoaders(['css', 'stylus'])
    }
  ]
}
