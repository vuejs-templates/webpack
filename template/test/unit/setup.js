// setup file for jest unit tests.
// this file is run before jest runs any of your tests.
import env from '../../config/env' // this should always be loaded first!
import Vue from 'vue'

Vue.config.productionTip = false

Object.keys(env).forEach(key => {
  process.env[key] = JSON.parse(env[key]) // since we stringify in the env file, we parse it back here.
})
