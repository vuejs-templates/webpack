require('@babel/register')
var config = require('../../config')

const paths = {
  chromedriver: require('chromedriver').path,
  geckodriver: require('geckodriver').path,
  seleniumServer: require('selenium-server').path,
  launchUrl: 'http://localhost:' + (process.env.PORT || config.dev.port),
  logPath: 'logs',
}
console.log('paths:', paths)

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: ['test/e2e/specs'],
  output_folder: 'test/e2e/reports',
  custom_assertions_path: ['test/e2e/custom-assertions'],
  detailed_output: true,
  silent: false,
  launch_url: paths.launchUrl,
  filter: '*.js',

  webdriver: {
    server_path: paths.seleniumServer,
    log_path: paths.logPath,
    host: 'localhost',
    port: 4444
  },

  test_settings: {
    // selenium_server: {
    //   start_session: true,
    //   selenium: {
    //     start_process: true,
    //     host: 'localhost',
    //     port: 4444,
    //     server_path: paths.seleniumServer,
    //     silent: true,
    //     cli_args: {
    //       'webdriver.chrome.driver': paths.chromedriver,
    //       'webdriver.gecko.driver': paths.geckodriver,
    //       'webdriver.firefox.profile': ''
    //     },
    //     desiredCapabilities: {
    //       browserName: 'chrome'
    //     }
    //   }
    // },

    chrome: {
      start_session: true,
      webdriver: {
        start_process: true,
        server_path: paths.chromedriver,
        port: 9515,
        cli_args: [
          '--verbose'
        ]
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        loggingPrefs: {
          driver: 'INFO',
          browser: 'INFO'
        },
        chromeOptions: {
          args: [
            '--headless',
          ],
        },
      }
    },

    firefox: {
      start_session: true,
      webdriver: {
        start_process: true,
        server_path: paths.geckodriver,
        cli_args: [
          '--log', 'debug'
        ]
      },
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true,
        acceptInsecureCerts: true,
        marionette: true
      }
    }
  }
}
