/**
 * @Author: vxhly
 * @Date:   2018-01-03 01:57:50 pm
 * @Email:  pengchengou@gmail.com
 * @Project: BIGBIGADS TECHNOLOGY LIMITED
 * @Filename: meta.js
 * @Last modified by:   vxhly
 * @Last modified time: 2018-01-03 03:05:36 pm
 * @License: MIT
 * @Copyright: BIGBIGADS TECHNOLOGY LIMITED
 */

const path = require('path')
const fs = require('fs')
const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage,
} = require('./utils')
const pkg = require('./package.json')

const templateVersion = pkg.version

module.exports = {
  helpers: {
    if_or(v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
    template_version() {
      return templateVersion
    },
  },

  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Project name',
    },
    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A Vue.js project',
    },
    author: {
      type: 'string',
      message: 'Author',
    },
    build: {
      type: 'list',
      message: 'Vue build',
      choices: [
        {
          name: 'Runtime + Compiler: recommended for most users',
          value: 'standalone',
          short: 'standalone',
        },
        {
          name:
            'Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY allowed in .vue files - render functions are required elsewhere',
          value: 'runtime',
          short: 'runtime',
        },
      ],
    },
    router: {
      type: 'confirm',
      message: 'Install vue-router?',
    },
    vuex: {
      type: 'confirm',
      message: 'Install vuex?'
    },
    axios: {
      type: 'confirm',
      message: 'Install axios?'
    },
    sass: {
      type: 'confirm',
      message: 'Use sass(scss)?'
    },
    flexbox: {
      type: 'confirm',
      message: 'Use flexbox(scss-flex)?'
    },
    Bus: {
      type: 'confirm',
      message: 'Would you use brother component communication?'
    },
    ElementUI: {
      type: 'confirm',
      message: 'Would you use ElementUI@2.0?'
    },
    EULConfig: {
      when: 'ElementUI',
      type: 'list',
      message: 'Configure the import mode',
      choices: [
        {
          name: 'Demand (http://element-cn.eleme.io/#/en-US/component/quickstart#on-demand)',
          value: 'demand',
          short: 'Demand'
        },
        {
          name: 'Standard (http://element-cn.eleme.io/#/en-US/component/quickstart#import-element)',
          value: 'standard',
          short: 'Standard'
        }
      ]
    },
    lint: {
      type: 'confirm',
      message: 'Use ESLint to lint your code?',
    },
    lintConfig: {
      when: 'lint',
      type: 'list',
      message: 'Pick an ESLint preset',
      choices: [
        {
          name: 'Standard (https://github.com/standard/standard)',
          value: 'standard',
          short: 'Standard',
        },
        {
          name: 'Airbnb (https://github.com/airbnb/javascript)',
          value: 'airbnb',
          short: 'Airbnb',
        },
        {
          name: 'none (configure it yourself)',
          value: 'none',
          short: 'none',
        },
      ],
    },
    unit: {
      type: 'confirm',
      message: 'Set up unit tests',
    },
    runner: {
      when: 'unit',
      type: 'list',
      message: 'Pick a test runner',
      choices: [
        {
          name: 'Jest',
          value: 'jest',
          short: 'jest',
        },
        {
          name: 'Karma and Mocha',
          value: 'karma',
          short: 'karma',
        },
        {
          name: 'none (configure it yourself)',
          value: 'noTest',
          short: 'noTest',
        },
      ],
    },
    e2e: {
      type: 'confirm',
      message: 'Setup e2e tests with Nightwatch?',
    },
    autoInstall: {
      type: 'list',
      message:
        'Should we run `npm install` for you after the project has been created? (recommended)',
      choices: [
        {
          name: 'Yes, use NPM',
          value: 'npm',
          short: 'npm',
        },
        {
          name: 'Yes, use Yarn',
          value: 'yarn',
          short: 'yarn',
        },
        {
          name: 'No, I will handle that myself',
          value: false,
          short: 'no',
        },
      ],
    },
  },
  filters: {
    '.eslintrc.js': 'lint',
    '.eslintignore': 'lint',
    'config/test.env.js': 'unit || e2e',
    'build/webpack.test.conf.js': "unit && runner === 'karma'",
    'test/unit/**/*': 'unit',
    'test/unit/index.js': "unit && runner === 'karma'",
    'test/unit/jest.conf.js': "unit && runner === 'jest'",
    'test/unit/karma.conf.js': "unit && runner === 'karma'",
    'test/unit/specs/index.js': "unit && runner === 'karma'",
    'test/unit/setup.js': "unit && runner === 'jest'",
    'test/e2e/**/*': 'e2e',
    'src/router/**/*': 'router',
    'src/store/**/*': 'vuex',
    'src/api/*': 'axios',
    'src/lib/fetch.js': 'axios',
    'src/config.js': 'axios',
    'src/assets/scss/**/*': 'sass',
    'src/lib/ElementUI.js': "ElementUI && EULConfig === 'demand'"
  },
  complete: function(data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runLintFix(cwd, data, green)
        })
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  },
}
