var ora = require('ora');

var spinner = ora('🐱  Building for production...');
spinner.color = 'magenta';
spinner.start();

module.exports = spinner;