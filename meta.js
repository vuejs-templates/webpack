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
      "message": "Project name For Mobile App or PC Web App (SPA)"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "A Vue.js project"
    },
    "author": {
      "type": "string",
      "message": "Author"
    },
    "typefor": {
      "type": "list",
      "message": "Devlop for PC or Mobile?",
      "choices": [
        {
          "name": "PC: no fast-click  and pc reset css",
          "value": "PC",
          "short": "pc"
        },
        {
          "name": "Mobile: have fast-click and mobile reset css",
          "value": "Mobile",
          "short": "mobile"
        }
      ]
    },
    "build": {
      "type": "list",
      "message": "Vue build",
      "choices": [
        {
          "name": "Runtime + Compiler: recommended for most users",
          "value": "standalone",
          "short": "standalone"
        },
        {
          "name": "Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY allowed in .vue files - render functions are required elsewhere",
          "value": "runtime",
          "short": "runtime"
        }
      ]
    },
    "router": {
      "type": "confirm",
      "message": "Install vue-router?"
    },
    "vuex": {
      "type": "confirm",
      "message": "Install vuex?"
    },
    "style": {
      "type": "list",
      "message": "Style Language Compatible",
      "choices": [
        {
          "name": "Only CSS: recommended for most users",
          "value": "Css",
          "short": "css"
        },
        {
          "name": "Stylus And Css: For Stylus users",
          "value": "Stylus",
          "short": "stylus"
        },
        {
          "name": "Sass And Css: For Sass users",
          "value": "Sass",
          "short": "sass"
        },
        {
          "name": "Less And Css: For Less users",
          "value": "Less",
          "short": "less"
        },
      ]
    },
    "api": {
      "type": "confirm",
      "message": "Use axios and jsonp or good-storage to help you connect your APIs?"
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
          "name": "Airbnb (https://github.com/airbnb/javascript)",
          "value": "airbnb",
          "short": "Airbnb"
        },
        {
          "name": "none (configure it yourself)",
          "value": "none",
          "short": "none"
        }
      ]
    },
    "unit": {
      "type": "confirm",
      "message": "Setup unit tests with Karma + Mocha?"
    },
    "e2e": {
      "type": "confirm",
      "message": "Setup e2e tests with Nightwatch?"
    }
  },
  "filters": {
    ".eslintrc.js": "lint",
    ".eslintignore": "lint",
    "config/test.env.js": "unit || e2e",
    "test/unit/**/*": "unit",
    "build/webpack.test.conf.js": "unit",
    "test/e2e/**/*": "e2e",
    "src/router/**/*": "router"
  },
  "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}yarn\n  yarn dev\n\nDocumentation can be found at https://vuejs-templates.github.io/webpack"
};
