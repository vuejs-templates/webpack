if (process.env.VUE_APP_ENV) {
  process.env.VUE_APP_ENV === process.env.NODE_ENV || 'development'
}

const env = require(`.environments/${process.env.VUE_APP_ENV}.env.js`)

module.exports = env