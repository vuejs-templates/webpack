// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    {{#flexible}}"postcss-px2rem": {},{{/flexible}}
    // to edit target browsers: use "browserlist" field in package.json
    "autoprefixer": {}
  }
}
