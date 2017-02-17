var path = require('path');
var fs = require('fs');

var localeDir = path.resolve(__dirname, '../../src/config/i18n');
var distFile = path.resolve(__dirname, '../tmp/i18n.json');

/**
 * 查找所有的多语言文件
 */
var findLangs = function(dir) {
    if (!fs.existsSync(dir)) {
        return null;
    }

    var dirs = fs.readdirSync(dir);
    if (!dirs || dirs.length === 0) {
        return null;
    }

    return dirs.filter(function(fileName) {
        return /\.json/.test(fileName);
    }).map(function(fileName) {
        return path.resolve(localeDir, fileName);
    });
};

/**
 * 合并多语言文件到 locales.json
 */
var mergeLangs = function(files) {
    if (!files || files.length === 0) {
        return {cn: {}};
    }

    return files.reduce(function(ret, item) {
        var reg = /(\w+)\.json$/;
        var m = item.match(reg);
        if (m && m.length === 2) {
            var langName = m[1];
            var content = fs.readFileSync(item, 'utf-8');
            ret[langName] = JSON.parse(content);
        }

        return ret;
    }, {});
};

module.exports = {
    make: function() {
        var merged = mergeLangs(findLangs(localeDir));
        fs.writeFileSync(distFile, JSON.stringify(merged), 'utf-8');
    }
};
