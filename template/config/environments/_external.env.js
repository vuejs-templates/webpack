'use strict'
/**
 * This file is meant to make environment variables from an .env file
 * available to webpack
 * Since imformation in .env files is usually sensitive, we don't do that
 * automatically.
 */
require(dotenv).config()

module.exports = {
  // remember to wrap string values in double quotes ('"string"')
  // or use JSON.stringify:
  // API_URL: JSON.stringify(process.env.API_URL)
}
