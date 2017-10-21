import ora from 'ora';
import rm from 'rimraf';
import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import config from '../config';
import webpackConfig from './webpack.prod.conf';

/* eslint-disable prefer-template */
/* eslint-disable function-paren-newline */

require('./check-versions').default();

process.env.NODE_ENV = 'production';

const spinner = ora('building for production...');
spinner.start();

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), (err) => {
  if (err) throw err;
  webpack(webpackConfig, (error, stats) => {
    spinner.stop();
    if (error) throw error;
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
    }

    console.log(chalk.cyan('  Build complete.\n'));
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.' +
      '  Opening index.html over file:// won\'t work.\n'
    ));
  });
});
