# Linter Configuration

This boilerplate uses [ESLint](http://eslint.org/) as the linter, and uses the [Standard](https://github.com/feross/standard/blob/master/RULES.md) preset with some small customizations.

If you are not happy with the default linting rules, you have several options:

1. Overwrite individual rules in `.eslintrc.js`. For example, you can add the following rule to enforce semicolons instead of omitting them:

  ``` js
  "semi": [2, "always"]
  ```

2. Remove the `extends: 'standard'` line in `.eslintrc.js` and use a completely custom eslint config. See [ESLint documentation](http://eslint.org/docs/user-guide/configuring) for more details.

3. Use a different ESLint preset, for example [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb).

4. Disable linting altogether: comment out the `module.preLoaders` block in `build/webpack.base.conf.js`.

  You will also need to disable linting if you are using a compile-to-JavaScript language, e.g. CoffeeScript.
