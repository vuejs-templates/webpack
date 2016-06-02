/* global env, mkdir, cp, rm */
// https://github.com/shelljs/shelljs
import 'shelljs/global';
env.NODE_ENV = 'production';

import path from 'path';
import config from '../config';
import ora from 'ora';
import webpack from 'webpack';
import webpackConfig from './webpack.prod.conf';

console.log( // eslint-disable-line
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
);

const spinner = ora('building for production...');
spinner.start();

const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);
rm('-rf', assetsPath);
mkdir('-p', assetsPath);
cp('-R', 'static/', assetsPath);

webpack(webpackConfig, (err, stats) => {
  spinner.stop();
  if (err) throw err;
  const statsString = stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  });
  process.stdout.write(`${statsString}\n`);
});
