# vue-webpack-boilerplate

> A full-featured Webpack setup with hot-reload, lint-on-save, unit testing & css extraction. Based on Sainsbury's coding standards.

## Documentation

Make sure to read the docs! Once scaffolding is complete you can view the read me

## Usage

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli). **It is recommended to use npm 4+ for a more efficient dependency tree.**

``` bash
$ npm install -g vue-cli
$ vue init JSainsburyPLC/vue-webpack-template my-project
$ cd my-project
$ npm install
$ npm run dev
```

## What's Included

- `PULL_REQUEST_TEMPLATE.md`
- Bithound config
- codecov.io setup
- `eslint`: conforming to Sainsbury's coding standards`
- `.editorconfig`

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

- `npm run unit`: Unit tests run in PhantomJS with [Karma](http://karma-runner.github.io/0.13/index.html) + [Mocha](http://mochajs.org/) + [karma-webpack](https://github.com/webpack/karma-webpack).
  - Supports ES2015 in test files.
  - Supports all webpack loaders.
  - Easy mock injection.
