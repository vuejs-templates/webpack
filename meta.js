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
      "default": "A Vue.js project"
    },
    "author": {
      "type": "string",
      "message": "Author"
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
    "compiler": {
      "type": "list",
      "message": "Which JavaScript compiler do you want to use?",
      "choices": [
        {
          "name": "TypeScript (awesome-typescript-loader + vue-class-component + babel)",
          "value": "typescript",
          "short": "typescript"
        },
        {
          "name": "ES2015 (babel)",
          "value": "babel",
          "short": "babel"
        },
      ]
    },
    "eslint": {
      "type": "confirm",
      "message": "Use ESLint to lint your JavaScript code?"
    },
    "eslintConfig": {
      "when": "eslint",
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
    },
    "tslint": {
      "when": "compiler == 'typescript'",
      "type": "confirm",
      "message": "Use TSLint to lint your TypeScript code?"
    },
    "tslintConfig": {
      "when": "tslint",
      "type": "list",
      "message": "Pick a TSLint preset",
      "choices": [
        {
          "name": "Standard (https://github.com/blakeembrey/tslint-config-standard)",
          "value": "standard",
          "short": "Standard"
        },
        {
          "name": "AirBNB (https://github.com/progre/tslint-config-airbnb)",
          "value": "airbnb",
          "short": "AirBNB"
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
    ".eslintrc.js": "eslint",
    ".eslintignore": "eslint",
    "tslint.json": "tslint",
    "tsconfig.json": "compiler == 'typescript'",
    "src/**/*.ts": "compiler == 'typescript'",
    "src/**/*.js": "compiler != 'typescript'",
    "config/test.env.js": "unit || e2e",
    "test/unit/**/*": "unit",
    "test/unit/**/!(karma.conf).js": "unit && compiler != 'typescript'",
    "test/unit/**/*.ts": "unit && compiler == 'typescript'",
    "test/unit/.tslint.json": "tslint && compiler == 'typescript'",
    "build/webpack.test.conf.js": "unit",
    "test/e2e/**/*": "e2e",
    "src/router/**/*": "router"
  },
  "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://vuejs-templates.github.io/webpack"
};
