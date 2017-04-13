const webpack = require('webpack');
const shell   = require('shelljs');
const chalk   = require('chalk')
const ora     = require('ora');


// Remove deprecation warning
process.noDeprecation = true;


// Get build config
const config = require('./config/build');


// Display spinner
const spinner = ora('Building for production...');
spinner.start();


// Get Webpack configuration
const webpackConfig = require('./webpack/analyzer')(config);


// Get Webpack compiler
const compiler = webpack(webpackConfig);


// Run
compiler.run(function (error, stats) {

    spinner.stop();

    // Show error
    if (error) {
        throw error;
    }

    // Show stats
    process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');

    // Build complete
    console.log(chalk.cyan('  Build complete.\n'));
});






