const path = require('path')
const fs = require('fs')
const spawn = require('child_process').spawn

function sortObject(object) {
  // Based on https://github.com/yarnpkg/yarn/blob/v1.3.2/src/config.js#L79-L85
  const sortedObject = {};
  Object.keys(object).sort().forEach(item => {
    sortedObject[item] = object[item];
  });
  return sortedObject;
}

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

exports.installDependencies = function installDependencies(cwd, data) {
  console.log('\n\n# Installing project dependencies ...')
  console.log('# ============\n')
  return runCommand('npm', ['install'], {
    cwd
  })
}

exports.runLintFix = function runLintFix(cwd, data) {
  if (data.lint && data.lintConfig === 'airbnb') {
    console.log('\n\n# Running eslint --fix to comply with AirBnB preset rules...')
    console.log('# ============\n')
    return runCommand('npm', ['run', 'lint', '--', '--fix'], {
      cwd
    })
  }
  return Promise.resolve()
}

exports.printMessage = function printMessage(data) {
  const message = `
# Project initialization finished!
# ============ 

To get started:

  ${data.inPlace ? '' : `cd ${data.destDirName}\n  `}npm run dev
  
Documentation can be found at https://vuejs-templates.github.io/webpack
`
  console.log(message)
}

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