# Linter Configuration

This boilerplate uses [ESLint](https://eslint.org/) as the linter, and uses the [Standard](https://github.com/feross/standard/blob/master/RULES.md) preset with some small customizations.

## eslint-plugin-vue

We always add [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue) as well, which comes with a whole bunch of helpful rules to write consistent Vue components - it can also lint templates!

You can find an overview of all the available rules on [github](https://github.com/vuejs/eslint-plugin-vue#gear-configs). We chose to add the `essential` configs, but we recommend to switch to the bigger `strongly-recommended` or `recommended` rulesets once you are familiar with them.

## Customizing

If you are not happy with the default linting rules, you have several options:

1. Overwrite individual rules in `.eslintrc.js`. For example, you can add the following rule to enforce semicolons instead of omitting them:

  ``` js
  // .eslintrc.js
  "semi": [2, "always"]
  ```

2. Pick a different ESLint preset when generating the project, for example [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb).

3. Pick "none" for ESLint preset when generating the project and define your own rules. See [ESLint documentation](https://eslint.org/docs/rules/) for more details.

## Fixing Linting Errors

You can run the following command to let eslint fix any errors it finds (if it can - not all errors are fixable like this):

```
npm run lint -- --fix
```

*(The `--` in the middle is necessary to ensure the `--fix` option is passed to `eslint`, not to `npm`. It can be omitted when using yarn)*


