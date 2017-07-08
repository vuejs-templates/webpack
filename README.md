# vue-webpack-sass-pug

[Vue's official webpack template](https://github.com/vuejs-templates/webpack) with additional [Sass](http://sass-lang.com/) & [Pug](https://pugjs.org/) options for variable Vue templates.

This gives you a modified CLI with several choices that will determine your Vue file layouts based on your Pre-Processor selections:  
![](http://i.imgur.com/l1Wafkn.gif)

Confirming the Pug selection results in actually applying a Pug template ```(dependencies included)```:
![](http://i.imgur.com/iGctYQE.gif)

Confirming the Sass or SCSS selection results in actually applying a Sass or SCSS template ```(dependencies included)```:    
![](http://i.imgur.com/4sF9nC5.gif)

## Documentation

- Includes the Webpack setup with hot-reload, lint-on-save, unit testing & css extraction.

- This template is Vue 2.0 compatible.

- [For webpack template](http://vuejs-templates.github.io/webpack): common questions specific to this template are answered and each part is described in greater detail
- [For Vue 2.0](http://vuejs.org/guide/): general information about how to work with Vue, not specific to this template

## Usage

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli). **It is recommended to use npm 3+ for a more efficient dependency tree.**

``` bash
$ npm install -g vue-cli
$ vue init andremorise/vue-webpack-sass-pug my-project
$ cd my-project
$ npm install (or yarn, when installed)
$ npm run dev (or yarn dev, when installed)
```

If port 8080 is already in use on your machine you must change the port number in `/config/index.js`. Otherwise `npm run dev` will fail.

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
  - Use `npm run build --report`to build with bundle size analytics.

- `npm run unit`: Unit tests run in PhantomJS with [Karma](http://karma-runner.github.io/0.13/index.html) + [Mocha](http://mochajs.org/) + [karma-webpack](https://github.com/webpack/karma-webpack).
  - Supports ES2015+ in test files.
  - Supports all webpack loaders.
  - Easy mock injection.

- `npm run e2e`: End-to-end tests with [Nightwatch](http://nightwatchjs.org/).
  - Run tests in multiple browsers in parallel.
  - Works with one command out of the box:
    - Selenium and chromedriver dependencies automatically handled.
    - Automatically spawns the Selenium server.

### Fork It And Make Your Own

You can fork this repo to create your own boilerplate, and use it with `vue-cli`:

``` bash
vue init username/repo my-project
```
