var path = require('path')

module.exports = {
  build: {
    // Where the index.html will be generated. Must be an absolute path.
    // The generated file will have correct asset URLs auto-injected.
    // If you are using this template with a backend-framework, you can set this
    // to the backend view file (.php, .erb etc.) rendered for your app.
    index: path.resolve(__dirname, 'dist/index.html'),

    // The root directory for your app's static assets. Must be an absolute path.
    // If you are using this template with a backend-framework, set this to
    // the framework's static assets directory, e.g. /path/to/project/public.
    assetsRoot: path.resolve(__dirname, 'dist'),

    // Nest webpack-generated assets under this directory in `assetsRoot`, so
    // that they are not mixed with other files you may have in `assetsRoot`.
    //
    // Files inside /static will be copied into this directory as-is. This means
    // if you change this prefix, all your absolute URLs referencing files in
    // /static will also need to be changed.
    //
    // This directory will be cleaned before each build.
    assetsPrefix: 'static',

    // This is where your `assetsRoot` will be served from over HTTP.
    // Only change this if your backend framework serves static assets with
    // a path prefix.
    assetsPublicPath: '/',

    // Whether to generate source map for production builds
    productionSourceMap: true
  },

  dev: {
    // Dev server port
    port: 8080,

    // Proxy requests to different backend during development.
    // https://github.com/chimurai/http-proxy-middleware
    proxyTable: {
      // '/api': {
      //   target: 'http://jsonplaceholder.typicode.com',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': ''
      //   }
      // }
    }
  }
}
