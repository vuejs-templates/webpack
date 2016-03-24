# vue-webpack-boilerplate

> A full-featured Webpack setup with hot-reload, lint-on-save, unit testing & css extraction.

### Before You Start...

This boilerplate is targeted towards large, serious projects and contains a lot of moving pieces. If you just want to try out `vue-loader` or whip out a quick prototype, use the [webpack-simple](https://github.com/vuejs-templates/webpack-simple) template instead.

## Usage

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli). **It is recommended to use npm 3+ for a more efficient dependency tree.**

``` bash
$ npm install -g vue-cli
$ vue init webpack my-project
$ cd my-project
$ npm install
$ npm run dev
```

## Folder Structure

``` bash
.
├── build
│   ├── dev-server.js         # development server script
│   ├── webpack.base.conf.js  # shared base webpack config
│   ├── webpack.dev.conf.js   # development webpack config
│   ├── webpack.prod.conf.js  # production webpack config
│   └── ...
├── src
│   ├── main.js               # app entry file
│   ├── App.vue               # main app component
│   ├── components            # ui components
│   │   └── ...
│   └── assets                # module assets (processed by webpack)
│       └── ...
├── static                    # pure static assets (directly copied)
├── dist                      # built files ready for deploy
├── test
│   └── unit                  # unit tests
│       └── ...
│   └── e2e                   # e2e tests
│       └── ...
├── .babelrc                  # babel config
├── .eslintrc.js              # eslint config
├── index.html                # main html file
└── package.json              # build scripts and dependencies
```

## What's Included

- `npm run dev`: first-in-class development experience.
  - Webpack + `vue-loader` for single file Vue components.
  - State preserving hot-reload
  - State preserving compilation error overlay
  - Lint-on-save with ESLint
  - Source maps

- `npm run build`: Production ready build.
  - JavaScript minified with [UglifyJS](https://github.com/mishoo/UglifyJS2).
  - HTML minified with [html-minifier](https://github.com/kangax/html-minifier).
  - CSS across all components extracted into a single file and minified with [cssnano](https://github.com/ben-eb/cssnano).
  - All static assets compiled with version hashes for efficient long-term caching, and a production `index.html` is auto-generated with proper URLs to these generated assets.
  - Also see [deployment notes](#how-do-i-deploy-built-assets-with-my-backend-framework).

- `npm run unit`: Unit tests run in PhantomJS with [Karma](http://karma-runner.github.io/0.13/index.html) + [Jasmine](http://jasmine.github.io/) + [karma-webpack](https://github.com/webpack/karma-webpack).
  - Supports ES2015 in test files.
  - Supports all webpack loaders.
  - Easy [mock injection](http://vuejs.github.io/vue-loader/workflow/testing-with-mocks.html).

- `npm run e2e`: End-to-end tests with [Nightwatch](http://nightwatchjs.org/).
  - Run tests in multiple browsers in parallel.
  - Works with one command out of the box:
    - Selenium and chromedriver dependencies automatically handled.
    - Automatically spawns the Selenium server.

For a better understanding of how things work, consult the docs for respective projects listed. In particular, [Webpack](http://webpack.github.io/) and [vue-loader](http://vuejs.github.io/vue-loader).

## Common Questions

- #### What's the difference between `src/assets/` and `static/`?

  Files inside `src/assets/` should be referenced via relative paths inside Vue component templates and styles. This allows them to be processed by webpack using `url-loader` and `file-loader` before copied into `/static`. This allows you to leverage features such as file naming with hashes for better caching and conditional base-64 inline-ing. You can even add [image-optimizing loaders](https://github.com/tcoopman/image-webpack-loader) to automatically optimize these images during build.

  Files inside `static/` are copied directly without modification; they can be reference anywhere via root-relative paths that start with `/static/`. This is an escape hatch when you want certain assets to completely bypass webpack.

- #### How do I configure the linting rules?

  The project uses [Standard](https://github.com/feross/standard) code style via ESLint. You can override the rules in `.eslintrc.js`, for example allowing semicolons by adding `"semi": [2, "always"]`.

  Alternatively you can use a different config altogether, for example [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb). Install it and change the `"extends"` field in `.eslintrc.js`.

- #### How do I use a CSS pre-processor inside `*.vue` files?

  First, install the corresponding loader (and their peer dependencies), e.g. to use LESS:

  ``` bash
  npm install less-loader less --save-dev
  ```

  Then in your `*.vue` files, use `<style lang="less">`. The CSS extraction has been pre-configured to work with most popular pre-processors.

  For SASS:

  ``` bash
  npm install sass-loader node-sass --save-dev
  ```

  Note that `lang="sass"` assumes SASS's indented syntax; Use `lang="scss"` if you want the CSS-superset syntax.

- #### How do I work with an existing backend server during development?

  You can edit `proxyTable` in [`build/dev-server.js`](https://github.com/vuejs-templates/webpack/blob/master/template/build/dev-server.js#L11) to proxy certain requests to your backend server.

- #### How do I deploy built assets with my backend framework?

  Your backend framework may come with a convention for where static assets should live, and the default generated file structure may need to be adjusted. Here's what you need to do:

  - Edit [`output.publicPath`](https://github.com/vuejs-templates/webpack/blob/master/template/build/webpack.base.conf.js#L11) to be the URL path where your backend framework serves static assets, e.g. `/public/`.

  - After running `npm run build`, copy the contents of `dist/index.html` into the appropriate server-side template, and copy everything in `dist/static` to the public/static directory of your backend framework. You can automate this by adding custom scripts in `build/build.js`.

- #### How do I run unit tests in more browsers?

  You can run the tests in multiple real browsers by installing more [karma launchers](http://karma-runner.github.io/0.13/config/browsers.html) and adjusting the `browsers` field in [`test/unit/karma.conf.js`](https://github.com/vuejs-templates/webpack/blob/master/template/test/unit/karma.conf.js#L46).

- #### How do I run e2e tests in more browsers?

  To configure which browsers to run the tests in, add an entry under "test_settings" in [`test/e2e/nightwatch.conf.js`](https://github.com/vuejs-templates/webpack/blob/master/template/test/e2e/nightwatch.conf.js#L17-L39) , and also the `--env` flag in [`test/e2e/runner.js`](https://github.com/vuejs-templates/webpack/blob/master/template/test/e2e/runner.js#L15). If you wish to configure remote testing on services like SauceLabs, you can either make the nightwatch config conditional based on environment variables, or use a separate config file altogether. Consult [Nightwatch's docs](http://nightwatchjs.org/guide#selenium-settings) for more details.

### Fork It And Make Your Own

You can fork this repo to create your own boilerplate, and use it with `vue-cli`:

``` bash
vue init username/repo my-project
```
