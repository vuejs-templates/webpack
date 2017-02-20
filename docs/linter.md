# Linter Configuration

This boilerplate uses [ESLint](http://eslint.org/) as the linter, and uses the [Standard](https://github.com/feross/standard/blob/master/RULES.md) preset with some small customizations.

If you are not happy with the default linting rules, you have several options:

1. Overwrite individual rules in `.eslintrc.js`. For example, you can add the following rule to enforce semicolons instead of omitting them:

  ``` js
  "semi": [2, "always"]
  ```

2. Pick a different ESLint preset when generating the project, for example [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb).

3. Pick "none" for ESLint preset when generating the project and define your own rules. See [ESLint documentation](http://eslint.org/docs/rules/) for more details.
