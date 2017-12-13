// setup file for jest unit tests.
// this file is run before jest runs any of your tests.
import Vue from 'vue'
import env from '../../config/test.env.js'

Vue.config.productionTip = false

Object.keys(env).forEach(key => {
  process.env[key] = JSON.parse(env[key]) // since we stringify in the env file, we parse it back here.
})
