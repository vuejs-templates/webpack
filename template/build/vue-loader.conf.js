var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'
var isForDistribution = process.env.FOR_DISTRIBUTION === 'true'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
      extract: isProduction && !isForDistribution
  })
}
