// 1. start the dev server using production config
process.env.NODE_ENV = 'testing'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
var server = require('../../build/dev-server.js'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

server.ready.then(() => {
  // 2. run the nightwatch test suite against it
  // to run in additional browsers:
  //    1. add an entry in test/e2e/nightwatch.conf.json under "test_settings"
  //    2. add it to the --env flag below
  // or override the environment flag, for example: `npm run e2e -- --env chrome,firefox`
  // For more information on Nightwatch's config file, see
  // http://nightwatchjs.org/guide#settings-file
  var opts = process.argv.slice(2){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  if (opts.indexOf('--config') === -1) {
    opts = opts.concat(['--config', 'test/e2e/nightwatch.conf.js']){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }
  if (opts.indexOf('--env') === -1) {
    opts = opts.concat(['--env', 'chrome']){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }

  var spawn = require('cross-spawn'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  var runner = spawn('./node_modules/.bin/nightwatch', opts, { stdio: 'inherit' }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

  runner.on('exit', function (code) {
    server.close(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    process.exit(code){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

  runner.on('error', function (err) {
    server.close(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    throw err{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
