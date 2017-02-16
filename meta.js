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
        "lintConfig": {
            "when": "lint",
            "type": "list",
            "message": "Pick an ESLint preset",
            "choices": [
                {
                    "name": "Standard (https://github.com/feross/standard)",
                    "value": "standard",
                    "short": "Standard"
                },
                {
                    "name": "AirBNB (https://github.com/airbnb/javascript)",
                    "value": "airbnb",
                    "short": "AirBNB"
                },
                {
                    "name": "none (configure it yourself)",
                    "value": "none",
                    "short": "none"
                }
            ]
        }
    },
    "filters": {
        ".eslintrc.js": "lint",
        ".eslintignore": "lint",
        "src/router/**/*": "router"
    },
    "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://vuejs-templates.github.io/webpack"
};
