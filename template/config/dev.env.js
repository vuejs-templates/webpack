import merge from 'webpack-merge';
import prodEnv from './prod.env';

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
});
