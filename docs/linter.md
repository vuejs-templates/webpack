# Linter Configuration

## ESLint
This boilerplate uses [ESLint](http://eslint.org/) for JavaScript linting, and uses the [Standard](https://github.com/feross/standard/blob/master/RULES.md) preset with some small customizations.

If you are not happy with the default linting rules, you have several options:

1. Overwrite individual rules in `.eslintrc.js`. For example, you can add the following rule to enforce semicolons instead of omitting them:

  ``` js
  "semi": [2, "always"]
  ```

2. Pick a different ESLint preset when generating the project, for example [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb).

3. Pick "none" for ESLint preset when generating the project and define your own rules. See [ESLint documentation](http://eslint.org/docs/rules/) for more details.

## stylelint
This boilerplate uses [stylelint](http://stylint.io/) as for style linting, and uses the [Standard](https://github.com/stylelint/stylelint-config-standard) preset.

If you are not happy with the default linting rules, you have several options:

1. Overwrite individual rules in `.stylelintrc.js`. For example, you can add the following rule to enforce tabs.

  ``` js
  "indentation": "tab",
  ```

2. Pick "none" for ESLint preset when generating the project and define your own rules. See [Stylelint documentation](http://stylelint.io/user-guide/rules/) for more details.
