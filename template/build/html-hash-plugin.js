/**
 * Created by su9er on 16/7/29.
 */

/*
 *
 * 自动编译模板,替换JS文件名
 *
 * 依赖ejs2
 *
 * plugin: [
 *   new html-hash-plugin({
 *     outputPath: './view/dist',
 *     viewPath: './view',
 *     app: ['app.ejs'],
 *     index: ['app.ejs', 'index.ejs']
 *   });
 * ]
 *
 * 可选参数为
 * outputPath 编译后模板的输出路径
 * viewPath 模板文件所在文件夹
 * 其余参数名均为entry的名称, 对应值为树枝,表示当该入口发生变化就渲染数组中的模板在模板中
 * 在模板中的使用方法
 *
 * 渲染app入口的文件名
 * <#= app #>
 *
 * <script src="/javascripts/page/index/<#= index #>"></script>
 *
 * */

const path    = require('path')
const fs      = require('fs')
const ejs     = require('ejs') //
const exec    = require('child_process').exec //
ejs.delimiter = '#'

const htmlHashPlugin = function (options) {
  this.options       = Object.assign({
    outputPath: './view/dist',
    viewPath  : './view'
  }, options)
  this.viewPath      = './view'    // 模板所在的文件夹
  this.outputPath    = './'      // 输出编译后的模板目录
  this.entries       = []           // 多个入口
  this.viewStr       = {}           // 读取模板的内容 模板名称作物键值
  this.views         = []             // 模板数组
  this.chunkVersions = {}
};

htmlHashPlugin.prototype.apply = function (compiler) {
  this.outputPath = path.resolve(compiler.context, this.options.outputPath)
  this.viewPath   = path.resolve(compiler.context, this.options.viewPath)
  this.entries    = Object.keys(compiler.options.entry)
  fs.access(this.outputPath, (err) => {
    if (err) {
      exec(`mkdir "${this.outputPath}"`, (err) => {
        if (err)
          console.error(err)
      })
    }
  })
  this.entries.forEach((entry) => {
    if (this.options[entry]) {
      this.views = this.views.concat(this.options[entry])
    }
  })
  // 过滤重复元素
  this.views = this.views.reduce((p, c) => {
    if (p.indexOf(c) === -1) {
      p.push(c)
    }
    return p
  }, [])
  this.views.forEach((v) => {
    fs.readFile(path.resolve(this.viewPath, v), 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        return null
      }
      v               = v.search(/(\\|\/)/ig) !== -1 ? /.+[\\|\/](.*?)$/.exec(v)[1] : v;    // 将文件名改成 XXX.ejs 去掉路径相关的符号
      this.viewStr[v] = data
    })
  })
  compiler.plugin('emit', (compilation, callback) => {
    let renderData = {}
    compilation.entries.forEach((entry) => {
      renderData[entry.chunks[0].name] = entry.chunks[0].files[0]
    })
    let changeViews = [];
    compilation.chunks.filter((chunk) => {
      let oldVersion                 = this.chunkVersions[chunk.name]
      this.chunkVersions[chunk.name] = chunk.hash
      return chunk.hash !== oldVersion
    }).forEach(c => {
      changeViews = changeViews.concat(this.options[c.name])
    })
    // 过滤重复元素
    changeViews.reduce((p, c) => {
      if (p.indexOf(c) === -1)
        p.push(c)
      return p
    }, []).forEach(e => {
      if (!this.viewStr[e]) return
      let renderHTML        = ejs.render(this.viewStr[e], renderData)
      compilation.assets[e] = {
        source() {
          return renderHTML
        },
        size() {
          return renderHTML.length
        }
      }
    })
    callback()
  })
  // 移动生产的模板到指定目录
  compiler.plugin('after-emit', (compilation, callback) => {
    Object.keys(compilation.assets).filter(a => {
      return /\.ejs/.test(a)
    }).forEach(e => {
      let location = compilation.assets[e].existsAt
      fs.rename(location, path.resolve(this.outputPath, e), err => {
        if (err) console.error(err)
      })
      callback()
    })
  })
}

module.exports = htmlHashPlugin
