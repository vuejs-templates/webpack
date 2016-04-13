module.exports = function (options) {
  function generateLoaders (loaders) {
    return ['vue-style'].concat(loaders.join('!')).join('!')
  }

  return [
    {
      test: /\.css$/,
      loader: generateLoaders(['css'])
    },
    {
      test: /\.less$/,
      loader: generateLoaders(['css', 'less'])
    },
    {
      test: /\.sass$/,
      loader: generateLoaders(['css', 'sass?indentedSyntax'])
    },
    {
      test: /\.scss$/,
      loader: generateLoaders(['css', 'sass'])
    },
    {
      test: /\.styl(us)?$/,
      loader: generateLoaders(['css', 'stylus'])
    }
  ]
}
