var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}
  // generate loader string to be used with extract text plugin
  function generateCSSLoader (loader, loaderOptions) {
    loaders = [{
        loader: 'css-loader',
        options: Object.assign({}, options),
    }]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, options, loaderOptions),
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({ fallbackLoader: 'vue-style-loader', loader: loaders })
    } else {
      return [{
        loader: 'vue-style-loader'
      }].concat(loaders)
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateCSSLoader(),
    postcss: generateCSSLoader(),
    less: generateCSSLoader('less'),
    sass: generateCSSLoader('sass', {indentedSyntax: true}),
    scss: generateCSSLoader('sass'),
    stylus: generateCSSLoader('stylus'),
    styl: generateCSSLoader('stylus')
  }
}

// return stringified loaders
exports.vueCSSLoaders = function (options) {
  var output = {}
  var loaders = exports.cssLoaders(options)

  for (var extension in loaders) {
    if (typeof loaders[extension] === "string") {
      output[extension] = loaders[extension]
    } else {
      loader = loaders[extension].map(function(l) {
        var loaderName = l.loader;
        var loaderOptions = l.options || {};

        if (Object.keys(loaderOptions).lenght === 0) {
          return loaderName;
        }

        return loaderName + '?' + Object.keys(loaderOptions).map(function(key) {
          return key + '=' + loaderOptions[key]
        }).join('&')
      }).join('!')

      output[extension] = loader
    }
  }

  return output
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loaders[extension]
    })
  }
  return output
}
