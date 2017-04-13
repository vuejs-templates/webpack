const path = require('path');
const utils = require('../utils/utils');

const spriteRootFolder = utils.resolve('src/sprites');

module.exports = {

    // Path to www/assets (file)
    assetsPath: utils.resolve('www/assets'),
    assetsPublicPath: 'assets',

    sprite: {
        imagesFolder: path.resolve(spriteRootFolder, 'images'),
        generatedImage: path.resolve(spriteRootFolder, 'generated', 'sprite.png'),
        generatedStylesheet: path.resolve(spriteRootFolder, 'generated', 'sprite.less'),
        template: utils.resolve('build/templates/sprite.handlebars'),
    }

};
