const path        = require('path');
const Spritesmith = require('webpack-spritesmith');

module.exports = (config) => {
    return new Spritesmith({

        src: {
            cwd: config.sprite.imagesFolder,
            glob: '*.png'
        },

        target: {
            image: config.sprite.generatedImage,
            css: [
                [config.sprite.generatedStylesheet, {format: 'texturepacker-like'}]
            ]
        },

        apiOptions: {
            cssImageRef: "./sprite.png",
        },

        spritesmithOptions: {
            algorithm: 'binary-tree',
            padding: 2
        },

        customTemplates: {
            'texturepacker-like': config.sprite.template
        }
    });
}
