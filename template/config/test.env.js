import merge from 'webpack-merge';
import devEnv from './dev.env';

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
});
