var ora = require('ora');

module.exports = function(string) {
    var spinner = ora('🐱  Building for ' + string + '...');
    spinner.color = 'magenta';
    spinner.start();
    return spinner;
}