const path = require('path');


/**
 * Return absolute path
 * @param folder
 * @returns {*}
 */
exports.resolve = function (folder) {
    return path.join(__dirname, '..', '..', folder);
}


/**
 * Require les fichiers contenus dans files, dans le dossier type
 * Appele la méthode retournée par le ficher avec config en paramètre
 * Si la méthode retourne null ou false, le résultat est enlevé
 *
 * @param type
 * @param config
 * @param files
 */
exports.require = function(type, config, files) {
    return files
        .map((file) => {
            return require(path.join(__dirname, '..', type, file))(config);
        })
        .filter(result => result);
}
