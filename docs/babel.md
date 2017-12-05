# Babel Configuration

This boilerplate uses [`babel-preset-env`](https://www.npmjs.com/package/babel-preset-env) for configuring babel. You can read more about it here - http://2ality.com/2017/02/babel-preset-env.html.

> A Babel preset that compiles ES2015+ down to ES5 by automatically determining the Babel plugins and polyfills you need based on your targeted browser or runtime environments.

It uses [`browserslist`](https://github.com/ai/browserslist) to parse this information, so we can use any [valid query format supported by `browserslist`](https://github.com/ai/browserslist#queries).

However there is a caveat. `browserslist` recommends defining the target in a common place like `package.json` or in a `.browserslistrc` config file. This allows tools like [`autoprefixer`](https://github.com/postcss/autoprefixer) and [`eslint-plugin-compat`](https://github.com/amilajack/eslint-plugin-compat) to share the config. For this template, `browserslist` is configured in the `package.json`:

```json
{
  "...": "...",
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
```

But the latest stable release of `babel-preset-env`, `v1.6.1` does not support loading the config from `package.json`. So the target environment is repeated in `.babelrc`. If you wish to change your target environment, please be sure to update both `package.json` and `.babelrc`. Note that this has been fixed in the beta version([`@babel/preset-env@7.0.0-beta.34`](https://github.com/babel/babel/tree/master/packages/babel-preset-env)) and the template will be updated once it is out of beta.
