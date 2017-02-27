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

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string and object to loader config object
  function generateLoader (loader) {
    if (typeof loader === 'string') {
      return {
        loader: loader + '-loader',
        options: {
          sourceMap: options.sourceMap
        }
      }
    } else if (typeof loader === 'object' && loader.constructor === Object) {
      return loader
    }
  }

  // generate loader string, object, array to be used with extract text plugin
  function generateLoaders (loader) {
    var loaders = [cssLoader]

    if (loader) {
      // wrap string & object to array
      if (typeof loader === 'string' ||
        (typeof loader === 'object' && loader.constructor === Object)) {
        loader = [loader]
      }

      loader.forEach(item => {
        loaders.push(generateLoader(item))
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders([
      {
        loader: 'sass-loader',
        options: {
          sourceMap: options.sourceMap,
          indentedSyntax: true
        }
      }
    ]),
    scss: generateLoaders([
      'sass'/*,
      // you can need sass-resources-loader for your sass
      {
        loader: 'sass-resources-loader',
        options: {
          // must choose a scss file
          resources: path.join(__dirname, '../src/config.scss')
        }
      }*/
    ]),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
