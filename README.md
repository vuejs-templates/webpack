# vue-webpack-template by Lanseria fork by [this template](http://vuejs-templates.github.io/webpack)

> A full-featured Webpack setup with hot-reload, lint-on-save, unit testing & css extraction.

> 这是一个几乎有全部功能的 `webpack` 配置模板，具有热加载，代码风格 `lint` 检查，单元测试和 `CSS` 提取。(这里测试单元不打算改，也没能力改)


> This template is Vue 2.0 compatible. For Vue 1.x use this command: `vue init webpack#1.0 my-project`

> 这是兼容 `Vue 2.0` 的模板，如果你需要 `Vue 1.0` 版本的模板，你可以使用官方的方案，这里页同样不提供和更新 `Vue 1.0` 的任何模板。（没有用过 `Vue 1.0`）

## Improvement point 与官方相比改进的地方

- 支持[Vuex](https://github.com/vuejs/vuex)
- 增加了网络API访问的接口，这里提供比较流行的两种[axios](https://github.com/axios/axios)与[jsonp](https://github.com/webmodules/jsonp)，其中jsonp可以使用提供的common/js/jsonp.js文件进行Promise扩展

## Documentation 文档

- [For this template](http://vuejs-templates.github.io/webpack): common questions specific to this template are answered and each part is described in greater detail
对此模板特有的常见问题进行了回答，并对每个部分进行了更详细的描述
- [For Vue 2.0](http://vuejs.org/guide/): general information about how to work with Vue, not specific to this template
关于如何使用Vue的一般信息，不是特定于此模板
- [For issue](https://github.com/Lanseria/learngit/issues) 因为这个毕竟 fork 别人的 `template` 所以如果你有问题问我，对此有任何改进，可以在这个链接上回复，谢谢

## Usage 使用

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli). **It is recommended to use npm 3+ for a more efficient dependency tree.**

**I recommend this if you installed [yarn](https://github.com/yarnpkg/yarn) 我推荐做法 如你安装了[yarn](https://github.com/yarnpkg/yarn)**

``` bash
$ yarn install -global vue-cli
$ vue init Lanseria/webpack#develop my-project
$ cd my-project
$ yarn
$ yarn dev
```

``` bash
$ npm install -g vue-cli
$ vue init Lanseria/webpack#develop my-project
$ cd my-project
$ npm install
$ npm run dev
```

## What's Included

- `npm run dev` or `yarn dev`: first-in-class development experience.
  - Webpack + `vue-loader` for single file Vue components.
  - State preserving hot-reload
  - State preserving compilation error overlay
  - Lint-on-save with ESLint
  - Source maps

- `npm run build` or `yarn build`: Production ready build.
  - JavaScript minified with [UglifyJS](https://github.com/mishoo/UglifyJS2).
  - HTML minified with [html-minifier](https://github.com/kangax/html-minifier).
  - CSS across all components extracted into a single file and minified with [cssnano](https://github.com/ben-eb/cssnano).
  - Static assets compiled with version hashes for efficient long-term caching, and an auto-generated production `index.html` with proper URLs to these generated assets.
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
vue init username/repo#branch my-project
```
