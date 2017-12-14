const merge  = require('webpack-merge')
const externalEnv = require('./environments/_external')

if (process.env.APP_ENV) {
  process.env.APP_ENV === process.env.NODE_ENV || 'development'
}

const path = require.resolve(`./environments/${process.env.APP_ENV}.env.js`)
const env = path 
  ? require(path)
  : {}

// Values from .env files overwrite defaults from /environments/*.env.js
const env = merge(env, externalEnv)

module.exports = env