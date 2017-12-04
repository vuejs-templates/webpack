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
    data.inPlace ? "" : data.destDirName,
    "package.json"
  )
  const packageJson = JSON.parse(fs.readFileSync(packageJsonFile))
  packageJson.devDependencies = sortObject(packageJson.devDependencies)
  packageJson.dependencies = sortObject(packageJson.dependencies)
  fs.writeFileSync(
    packageJsonFile,
    JSON.stringify(packageJson, null, 2) + "\n"
  );
}

/**
 * Runs `npm install` in the project directory
 * @param {string} cwd Path of the created project directory
 * @param {object} data Data from questionnaire
 */
exports.installDependencies = function installDependencies(cwd, executable = 'npm', color) {
  console.log(`\n\n# ${color('Installing project dependencies ...')}`)
  console.log('# ========================\n')
  return runCommand(executable, ['install'], {
    cwd
  })
}

/**
 * Runs `npm run lint -- --fix` in the project directory
 * @param {string} cwd Path of the created project directory
 * @param {object} data Data from questionnaire
 */
exports.runLintFix = function runLintFix(cwd, data, color) {
  if (data.lint && lintStyles.indexOf(data.lintConfig) !== -1) {
    console.log(`\n\n${color('Running eslint --fix to comply with chosen preset rules...')}`)
    console.log('# ========================\n')
    return runCommand('npm', ['run', 'lint', '--', '--fix'], {
      cwd
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

  ${yellow(`${data.inPlace ? '' : `cd ${data.destDirName}\n  `}${requiresLint(data) ? 'npm run lint -- --fix\n  ' : ''}npm run dev`)}
  
Documentation can be found at https://vuejs-templates.github.io/webpack
`
  console.log(message)
}

/**
 * Returns true if the user will have to run lint --fix themselves.
 * @param {Object} data Data from questionnaire.
 */
function requiresLint(data) {
  return !data.autoInstall && data.lint && lintStyles.indexOf(data.lintConfig) !== -1
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
    const spwan = spawn(cmd, args, Object.assign({
      cwd: process.cwd(),
      stdio: 'inherit',
    }, options))

    spwan.on('exit', () => {
      resolve()
    })
  })
}

function sortObject(object) {
  // Based on https://github.com/yarnpkg/yarn/blob/v1.3.2/src/config.js#L79-L85
  const sortedObject = {};
  Object.keys(object).sort().forEach(item => {
    sortedObject[item] = object[item];
  });
  return sortedObject;
}