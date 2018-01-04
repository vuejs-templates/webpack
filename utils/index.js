const path = require('path')
const fs = require('fs')
const spawn = require('child_process').spawn

const lintStyles = ['standard', 'airbnb']

/**
 * Sorts dependencies in package.json alphabetically.
 * They are unsorted because they were grouped for the handlebars helpers
 * @param {object} data Data from questionnaire
 */
exports.sortDependencies = function sortDependencies(data) {
  const packageJsonFile = path.join(
    data.inPlace ? '' : data.destDirName,
    'package.json'
  )
  const packageJson = JSON.parse(fs.readFileSync(packageJsonFile))
  packageJson.devDependencies = sortObject(packageJson.devDependencies)
  packageJson.dependencies = sortObject(packageJson.dependencies)
  fs.writeFileSync(packageJsonFile, JSON.stringify(packageJson, null, 2) + '\n')
}

/**
 * Runs `npm install` in the project directory
 * @param {string} cwd Path of the created project directory
 * @param {object} data Data from questionnaire
 */
exports.installDependencies = function installDependencies(
  cwd,
  data,
  chalk
) {
  const executable = data.autoInstall
  console.log(`\n\n# ${chalk.green('Installing project dependencies ...')}`)
  console.log('# ========================\n')
  return runCommand(executable, ['install'], {
    cwd,
  })
  .catch(err => {

    const msg = npmErrorMsg(data, chalk)
    const error =  new Error(msg)
    error.name = 'VueTemplateNpmInstallError'
    throw error
  })
}

/**
 * Runs `npm run lint -- --fix` in the project directory
 * @param {string} cwd Path of the created project directory
 * @param {object} data Data from questionnaire
 */
exports.runLintFix = function runLintFix(cwd, data, chalk) {
  if (data.lint && lintStyles.indexOf(data.lintConfig) !== -1) {
    console.log(
      `\n\n${chalk.green(
        'Running eslint --fix to comply with chosen preset rules...'
      )}`
    )
    console.log('# ========================\n')
    const args =
      data.autoInstall === 'npm'
        ? ['run', 'lint', '--', '--fix']
        : ['run', 'lint', '--fix']
    return runCommand(data.autoInstall, args, {
      cwd,
    })
  }
  return Promise.resolve()
}

/**
 * Prints the final message with instructions of necessary next steps.
 * @param {Object} data Data from questionnaire.
 */
exports.printMessage = function printMessage(data, { green, yellow }) {
  const message = `
# ${green('Project initialization finished!')}
# ========================

To get started:

  ${yellow(
    `${dirMsg(data)}${installMsg(
      data
    )}${lintMsg(data)}npm run dev`
  )}
  
Documentation can be found at https://vuejs-templates.github.io/webpack
`
  console.log(message)
}

/**
 * If the project was generated in a new subdirectory,
 * this will print a instructions to navigate to that directory.
 * @param {Object} data Data from questionnaire.
 */
function dirMsg(data) {
  return data.inPlace
    ? ''
    : `cd ${data.destDirName}\n  `
}

/**
 * If the user will have to run lint --fix themselves, it returns a string
 * containing the instruction for this step.
 * @param {Object} data Data from questionnaire.
 */
function lintMsg(data) {
  return !data.autoInstall &&
    data.lint &&
    lintStyles.indexOf(data.lintConfig) !== -1
    ? 'npm run lint -- --fix (or for yarn: yarn run lint --fix)\n  '
    : ''
}

/**
 * If the user will have to run `npm install` or `yarn` themselves, it returns a string
 * containing the instruction for this step.
 * @param {Object} data Data from the questionnaire
 */
function installMsg(data) {
  return !data.autoInstall ? 'npm install (or if using yarn: yarn)\n  ' : ''
}

function npmErrorMsg(data, chalk) {
  return `
# ${chalk.red('Error installing dependencies')}
# ========================

Don't worry though, your project is still totally fine.
We just had problems running \`npm install\` for you.

So run these commands in your project directory and you will be fine:
  ${dirMsg(data)}${chalk.yellow('npm install')} (or for yarn: ${chalk.yellow('yarn')})
  ${data.lint ? `${chalk.yellow('npm run lint -- --fix')} (or for yarn: ${chalk.yellow('yarn lint --fix')})` : ''}`    
}

/**
 * Spawns a child process and runs the specified command
 * By default, runs in the CWD and inherits stdio
 * Options are the same as node's child_process.spawn
 * @param {string} cmd
 * @param {array<string>} args
 * @param {object} options
 */
function runCommand(cmd, args, options) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      cmd,
      args,
      Object.assign(
        {
          cwd: process.cwd(),
          stdio: 'inherit',
          shell: true,
        },
        options
      )
    )

    child.on('exit', () => {
      resolve()
    })

    child.on('error', error => {
      reject(error)
    })
  })
}

function sortObject(object) {
  // Based on https://github.com/yarnpkg/yarn/blob/v1.3.2/src/config.js#L79-L85
  const sortedObject = {}
  Object.keys(object)
    .sort()
    .forEach(item => {
      sortedObject[item] = object[item]
    })
  return sortedObject
}
