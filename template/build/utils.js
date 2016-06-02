import path from 'path';
import config from '../config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

exports.assetsPath = function assetsPath(_path) {
  return path.posix.join(config.build.assetsSubDirectory, _path);
};

exports.cssLoaders = function cssLoaders(options = {}) {
  // generate loader string to be used with extract text plugin
  function generateLoaders(loaders) {
    const sourceLoader = loaders.map((_loader) => {
      let extraParamChar;
      let loader;
      if (/\?/.test(loader)) {
        loader = _loader.replace(/\?/, '-loader?');
        extraParamChar = '&';
      } else {
        loader = `${_loader}-loader`;
        extraParamChar = '?';
      }
      return `${loader}${options.sourceMap ? `${extraParamChar}sourceMap` : ''}`;
    }).join('!');

    if (options.extract) {
      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader);
    }
    return ['vue-style-loader', sourceLoader].join('!');
  }

  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus']),
  };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function styleLoaders(options) {
  const output = [];
  const loaders = exports.cssLoaders(options);
  const loaderKeys = Object.keys(loaders);
  loaderKeys.forEach((extension) => {
    const loader = loaders[extension];
    output.push({
      test: new RegExp(`\\.${extension}$`),
      loader,
    });
  });
  return output;
};
