# Handing Static Assets

You will notice in the project structure we have two directories for static assets: `src/assets` and `static/`. What is the difference between them?

### Webpacked Assets

To answer this question, we first need to understand how Webpack deals with static assets. In `*.vue` components, all your templates and CSS are parsed by `vue-html-loader` and `css-loader` to look for asset URLs. For example, in `<img src="./logo.png">` and `background: url(./logo.png)`, `"./logo.png"` is a relative asset path and will be **resolved by Webpack as a module dependency**.

Because `logo.png` is not JavaScript, when treated as a module dependency, we need to use `url-loader` and `file-loader` to process it. This boilerplate has already configured these loaders for you, so you basically get features such as filename fingerprinting and conditional base64 inlining for free, while being able to use relative/module paths without worrying about deployment.

Since these assets may be inlined/copied/renamed during build, they are essentially part of your source code. This is why it is recommended to place Webpack-processed static assets inside `/src`, along side other source files. In fact, you don't even have to put them all in `/src/assets`: you can organize them based on the module/component using them. For example, you can put each component in its own directory, with its static assets right next to it.

### Asset Resolving Rules

- **Relative URLs**, e.g. `./assets/logo.png` will be interpreted as a module dependency. They will be replaced with a auto-generated URL based on your Webpack output configuration.

- **Non-prefixed URLs**, e.g. `assets/logo.png` will be treated the same as the relative URLs and translated into `./assets/logo.png`.

- **URLs prefixed with `~`** are treated as a module request, similar to `require('some-module/image.png')`. You need to use this prefix if you want to leverage Webpack's module resolving configurations. For example if you have a resolve alias for `assets`, you need to use `<img src="~assets/logo.png">` to ensure that alias is respected.

- **Root-relative URLs**, e.g. `/assets/logo.png` are not processed at all.

### Getting Asset Paths in JavaScript

In order for Webpack to return the correct asset paths, you need to use `require('./relative/path/to/file.jpg')`, which will get processed by `file-loader` and returns the resolved URL. For example:

``` js
computed: {
  background () {
    return require('./bgs/' + this.id + '.jpg')
  }
}
```

**Note the above example will include every image under `./bgs/` in the final build.** This is because Webpack cannot guess which of them will be used at runtime, so it includes them all.

### "Real" Static Assets

In comparison, files in `static/` are not processed by Webpack at all: they are directly copied to their final destination as-is, with the same filename. You must reference these files using absolute paths, which is determined by joining `build.assetsPublicPath` and `build.assetsSubDirectory` in `config.js`.

As an example, with the following default values:

``` js
// config.js
module.exports = {
  // ...
  build: {
    assetsPublicPath: '/',
    assetsSubDirectory: 'static'
  }
}
```

Any file placed in `static/` should be referenced using the absolute URL `/static/[filename]`. If you change `assetSubDirectory` to `assets`, then these URLs will need to be changed to `/assets/[filename]`.

We will learn more about the config file in the section about [backend integration](backend.md).
