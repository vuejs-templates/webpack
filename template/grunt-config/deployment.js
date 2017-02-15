module.exports = function (grunt) {
    'use strict';

    // Config
    return {
        'ssh-deploy-release': {
            options: {
                localPath:     'dist',
            },

            'review': {
                options: {
                    host:        '',
                    username:    '',
                    password:    '',
                    deployPath:  '/path/to/' + grunt.option('branch'),
                    allowRemove: true
                }
            },
        }
    };
};