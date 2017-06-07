// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  before: function(client) {
    client.globals.waitForConditionTimeout = 5000{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  afterEach: function(client, done) {
    if (client.currentTest.results.failed > 0 || client.currentTest.results.errors > 0) {
      client
      .source(function (result){
          console.log(result.value);
      })
      .getLogTypes(function(result) {
        console.log(result);
      })
      .getLog('browser', function(result) {
        console.log(result);
      }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }
    done(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  'default e2e tests': function {{#if_eq lintConfig "airbnb"}}test{{/if_eq}}(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

    browser
      .url(devServer)
      .waitForElementVisible('#app')
      .assert.elementPresent('.hello')
      .assert.containsText('h1', 'Welcome to Your Vue.js App')
      .assert.elementCount('img', 1)
      .end(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
