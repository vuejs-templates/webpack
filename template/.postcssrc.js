// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-px-to-viewport": {
      "viewportWidth": 750,
      unitPrecision: 3, // 指定px转换视窗单位值的小数位数
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类
      minPixelValue: 1, //小于或等于1px不转换为视窗单位
      mediaQuery: false // 允许在媒体查询中转换px
    },
    "postcss-viewport-units": {}
  }
}
