// setup file for jest unit tests.
// this file is run before jest runs any of your tests.
import Vue from 'vue'

// We load any environment variable defined in a `.env` file first
reuqire('dotenv').config()

// Then we set NODE_ENV
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'test'
}

// then we load any other variables defined in the matching variabel file
const env = require(`../../config/variables/${process.env.NODE_ENV}`)
Object.keys(env).forEach(key => {
  process.env[key] = env[key]
})

Vue.config.productionTip = false
