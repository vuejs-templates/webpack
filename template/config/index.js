// see http://vuejs-templates.github.io/webpack for documentation.
import path from 'path';
import prodEnv from './prod.env';
import devEnv from './dev.env';

module.exports = {
  build: {
    env: prodEnv,
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
  },
  dev: {
    env: devEnv,
    port: 8080,
    proxyTable: {},
  },
};
