// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

 // see nightwatch.conf.js
 // default: http://localhost:8080
 // automatically uses dev Server port from /config.index.js
var devServer = browser.globals.devServerURL

module.exports = {
  'default e2e tests': function (browser) {
    browser
    .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.logo')
      .assert.containsText('h1', 'Hello Vue!')
      .assert.elementCount('p', 3)
      .end()
  }
}
