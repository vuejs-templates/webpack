import webpack from 'webpack';
import merge from 'webpack-merge';
import testEnv from '../config/test.env';
import baseConfig from './webpack.base.conf';
import utils from './utils';
import path from 'path';

const projectRoot = path.resolve(__dirname, '../');

const webpackConfig = merge(baseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    loaders: utils.styleLoaders(),
  },
  devtool: '#inline-source-map',
  vue: {
    loaders: {
      js: 'isparta',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': testEnv,
    }),
  ],
});

// no need for app entry during tests
delete webpackConfig.entry;

// make sure isparta loader is applied before eslint
webpackConfig.module.preLoaders = webpackConfig.module.preLoaders || [];
webpackConfig.module.preLoaders.unshift({
  test: /\.js$/,
  loader: 'isparta',
  include: path.resolve(projectRoot, 'src'),
});

// only apply babel for test files when using isparta
webpackConfig.module.loaders.some((_loader) => {
  const loader = _loader;
  if (loader.loader === 'babel') {
    loader.include = path.resolve(projectRoot, 'test/unit');
    return true;
  }
  return false;
});

module.exports = webpackConfig;
