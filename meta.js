module.exports = {
    "helpers": {
        "if_or": function (v1, v2, options) {
            if (v1 || v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
    },
    "prompts": {
        "name": {
            "type": "string",
            "required": true,
            "message": "Project name"
        },
        "description": {
            "type": "string",
            "required": false,
            "message": "Project description",
            "default": ""
        },
        "ProjectType": {
            "type": "confirm",
            "required": false,
            "message": "Depend app project?"
        },
        "assetsPath": {
            "type": "string",
            "required": false,
            "message": "Project assets directory",
            "default": ""
        },
        "author": {
            "type": "string",
            "message": "Author"
        },
        "router": {
            "type": "confirm",
            "message": "Install vue-router?"
        },
        "vuex": {
            "type": "confirm",
            "message": "Install vuex?"
        },
        "lint": {
            "type": "confirm",
            "message": "Use ESLint to lint your code?"
        },
        "unit":{
            "type": "confirm",
            "required": false,
            "message": "install karma?"
        }
    },
    "filters": {
        ".eslintrc.js": "lint",
        ".eslintignore": "lint",
        "src/router/**/*": "router",
        "src/view": "router",
        "src/plugins/appInterface/*": "ProjectType",
        "test/unit/**/*": "unit",
        "build/webpack.test.conf.js": "unit",
    },
    "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://github.com/ct-fed/ctyapp_h5build"
};
