const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const handlebars = require('handlebars')

module.exports = {
  write(results, options, done) {
    // read the html template
    fs.readFile(path.join(__dirname, 'html-reporter.hbs'), (err, data) => {
      if (err) throw err
      const template = data.toString()
      const browser = options.filename_prefix.split('_').join(' ')

      // merge the template with the test results data
      const html = handlebars.compile(template)({
        results,
        options,
        browser,
        timestamp: new Date().toString()
      })

      const reportDir = path.join(__dirname, './reports/e2e', browser)
      mkdirp.sync(reportDir)
      const reportFilePath = path.join(reportDir, 'index.html')

      // write the html to a file
      fs.writeFile(reportFilePath, html, err => {
        if (err) throw err
        // eslint-disable-next-line
        console.log(`Report generated: ${reportFilePath}`)
        done()
      })
    })
  }
}
