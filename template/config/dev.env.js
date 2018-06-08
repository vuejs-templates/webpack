'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

let config = {
  NODE_ENV: '"development"'
}
const argv = JSON.parse(process.env.npm_config_argv).original
const mock = argv.find(a => a === '--local' || a === '--cross' || a === '--mixin')

switch (mock) {
  case '--local':
    config.MOCK = '"local"'
  break
  case '--cross':
    config.MOCK = '"cross"'
  break
  default:
    config.MOCK = '"mixin"'
}
// // if (mock) {
//   config.MOCK = mock ? 
//                   mock === '--local' ? '"local"' : 
//                   mock === '--cross' ? '"cross"' : 
//                 : '"mixin"'
// // }

module.exports = merge(prodEnv, config)
