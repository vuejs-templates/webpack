const webpack          = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chokidar         = require('chokidar');
const _                = require('lodash');
const utils            = require('./utils/utils');


// Remove deprecation warning
//process.noDeprecation = true;


// Get build config
const config = require('./config/dev');


// Get Webpack configuration
const webpackConfig = require('./webpack/dev')(config);


// Get Webpack compiler
const compiler = webpack(webpackConfig);


// Dev server
const server = new WebpackDevServer(compiler, {
    headers: {"Access-Control-Allow-Origin": "*"},
    hot: true,
    clientLogLevel: "none",     // When using inline mode, the console in your DevTools will show you messages e.g. before reloading, before an error or when Hot Module Replacement is enabled. This may be too verbose.
    noInfo: true,               // With noInfo enabled, messages like the webpack bundle information that is shown when starting up and after each save, will be hidden. Errors and warnings will still be shown.
    overlay: {
        warnings: true,
        errors: true
    },              // Shows a full-screen overlay in the browser when there are compiler errors or warnings. Disabled by default. If you want to show only compiler errors:
    quiet: false                // With quiet enabled, nothing except the initial startup information will be written to the console. This also means that errors or warnings from webpack are not visible.
});


// Run dev server
server.listen(8888);


// Watch change on php files and trigger reload
const triggerChange = _.debounce(() => {
    console.log('Trigger "content-changed"');
    server.sockWrite(server.sockets, "content-changed");
}, 50);

server.middleware.waitUntilValid(() => {
    chokidar.watch(
        utils.resolve('www/**/*.php'),
        {ignored: ['vendor/**']}
    ).on('all', triggerChange);
});
