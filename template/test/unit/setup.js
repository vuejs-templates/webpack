// setup file for jest unit tests.
// this file is run before jest runs any of your tests.
import Vue from 'vue'

// We load any environment variable defined in a `.env` file first
require('dotenv').config()

// Then we set NODE_ENV
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'test'
}

// then we load any other variables defined in the matching variabel file
// This ugly switch statement is necessary to accommodate airbnb eslint import rules.
// See also: /build/utils.js
let env
switch (process.env.NODE_ENV) {
  case 'development':
    env = require('../../config/variables/development.js') // eslint-disable-line
    break
  case 'test':
    env = require('../../config/variables/test.js') // eslint-disable-line
    break
  case 'production':
    env = require('../../config/variables/production.js') // eslint-disable-line
    break
}
Object.keys(env).forEach(key => {
  process.env[key] = env[key]
})

Vue.config.productionTip = false
