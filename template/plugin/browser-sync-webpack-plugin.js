/**
 * Created by su9er on 16/8/10.
 */

/**
 * 通过webpack插件的形式调用browser-sync
 * 使用插件时传入的option与browser-sync一致
 * 新增watchDir参数来设置舰艇文件夹内的文件变化,实现hot reload
 * new BrowserSyncPlugin({
 *   watchDir: ['./static/', './static/view/', './dll/'],
 *   server: {
 *     baseDir: ['./static/', './static/view/', './dll/']
 *   }
 * })
 * or
 * new BrowserSyncPlugin({
 *   watchDir: ['./static', './static/view', './dll/'],
 *   proxy: 'localhost:4000'
 * })
 */

const browserSync = require('browser-sync')

function BrowserSyncPlugin(browserSyncOptions) {
  const defaultPluginOptions = {
    name       : 'bs-webpack-plugin',
    serveStatic: ['./static/', './static/view/', './dll/'],
    proxy      : {
      target  : 'localhost:1234',
      proxyRes: [
        function (proxyRes) {
          proxyRes.headers['Content-Type'] = proxyRes.headers['content-type']
        }
      ]
    }
  };

  this.browserSyncOptions = Object.assign({}, defaultPluginOptions, browserSyncOptions);

  this.browserSync          = browserSync.create(this.browserSyncOptions.name);
  this.isBrowserSyncRunning = false;
}

BrowserSyncPlugin.prototype.apply = function (compiler) {
  compiler.plugin('emit', (compilation, callback) = > {
    if (this.isBrowserSyncRunning
  )
  {
    return callback();
  }
  this.browserSync.init(this.browserSyncOptions)
  this.browserSync.watch(this.browserSyncOptions.serveStatic).on('change', this.browserSync.reload)
  this.isBrowserSyncRunning = true;
  callback();
})
  ;
}

module.exports = BrowserSyncPlugin
