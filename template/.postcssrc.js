// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  // "plugins": {
  //   // to edit target browsers: use "browserlist" field in package.json
  //   "autoprefixer": {}
  // }
  plugins: [
    require('autoprefixer')({
      browsers: ['last 5 versions', 'Android >= 4.0', 'iOS >= 6']
    }),
    require('postcss-px2rem')({ remUnit: 75 })
  ]
}
