var connect = require('connect');
var serveStatic = require('serve-static');
var path = require('path');

connect().use(serveStatic(path.resolve(__dirname, 'dist'))).listen(8080, function () {
    console.log('Server running on 8080...');
});
