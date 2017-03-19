# vue-webpack-boilerplate

> A full-featured Webpack setup with hot-reload, lint-on-save, unit testing & css extraction.

> This template is Vue 2.0 compatible. For Vue 1.x use this command: `vue init webpack#1.0 my-project`

## multi-page-vue for Thinkphp

- Have not enough for test, do not open test mode. If you want add a new module, please copy 'src/module/Index'.

- If you need vue-router and vuex, add your file in the child-page-module's manage. ex: I put router.js in src/module/Index/manage.

## Documentation

- [For this template](http://vuejs-templates.github.io/webpack): common questions specific to this template are answered and each part is described in greater detail
- [For Vue 2.0](http://vuejs.org/guide/): general information about how to work with Vue, not specific to this template

## Usage

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli). **It is recommended to use npm 3+ for a more efficient dependency tree.**

``` bash
$ npm install -g vue-cli
# $ vue init webpack my-project
# $ cd my-project
$ vue init crossingmay/webpack Source
$ cd Source
$ npm install
$ npm run dev
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

>Dont use unit-test & e2e

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

# 基于ThinkPhp的多页项目——构建工具使用文档

## Start

```bash
$ vue init crossingmay/webpack Source
```

然后根据下图的提示来进行输入，注意，这里不加入ESLint，unit-tests 和e2e-tests。

其中ESLint使用Standard.js来替代规范检查，详情查看 [StandardJs团队推广](http://crossingmay.com/2017/01/25/standardjs/)。

![步骤一](http://7xootj.com1.z0.glb.clouddn.com/v3-step1.png "Optional title")

## How to use

```bash
$ cd Source
$ yarn install
$ yarn run dev # 进入开发模式
$ yarn run build # 构建部署代码
$ yarn run deploy # 部署到cdn
```

此处的yarn可以用npm替代

## About deploy
在构建工具中加入了`gulp`任务`uploadToUpyun`，目的是直接把生成的js和css以及图片字体等静态资源上传到cdn，实现非覆盖式发布

配置同样在`config`下的`index.js`文件中。

在cdn下填入输入你自己的upyun仓库配置——如`host/bucket/folder/username/password`，这些都是上传到cdn需要的一些必要配置。

如果不明白，可以查看npm仓库对应的使用示例 [upyun_cdn](https://www.npmjs.com/package/upyun_cdn)

## Structure

**关于页面规范和一些说明**

```js
config/index.js // 项目构建配置，包括webpack的开发和生产环境的相关参数配置以及upyun的配置

src/assets // 放置如图片、字体等静态文件
src/componets // vue公共组件
src/module // 多页模块
src/module/Index 
// 默认入口
// 如果要新开一个单页，就复制一份Index模块(模块名首字母要大写，以此对应ThinkPhp的Controller)。
// 入口的html文件和js文件和模块名称统一，为小写。
src/module/YourModule.../manage // 放置router.js和vuex的store.js

```



