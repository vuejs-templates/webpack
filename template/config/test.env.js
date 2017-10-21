import merge from 'webpack-merge';
import devConfig from './dev.env';

export default merge(devConfig, {
  env: {
    NODE_ENV: '"testing"'
  }
});
