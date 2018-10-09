const fs = require('fs')
const path = require('path')

const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

// 读取`skeleton.json`，以`index.html`为模板写入内容
const renderer = createBundleRenderer(path.join(__dirname, './server-dist/skeleton.json'), {
  template: fs.readFileSync(path.join(__dirname, './index.html'), 'utf-8')
})

// 把上一步模板完成的内容写入（替换）`index.html`
renderer.renderToString({}, (err, html) => {
  if (!fs.existsSync('./dist/')) {
    fs.mkdirSync('./dist/')
  }
  fs.writeFileSync('./dist/index.html', html, 'utf-8')
})