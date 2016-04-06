# Handing Static Assets

You will notice in the project structure we have two directories for static assets: `src/assets` and `static/`. What is the difference between them?

### Webpacked Assets

To answer this question, we first need to understand how Webpack deals with static assets. In `*.vue` components, all your templates and CSS are parsed by `vue-html-loader` and `css-loader` to look for relative asset URLs. For example, in `<img src="./logo.png">` and `background: url(./logo.png)`, `"./logo.png"` is a relative asset path and will be **resolved by Webpack as a module dependency**.

Because `logo.png` is not JavaScript, we need to use `url-loader` and `file-loader` to process it. This boilerplate has already configured these loaders for you, so you basically get features such as filename fingerprinting and conditional bas64 inlining for free, while being able to use relative paths everywhere.

Because these assets may be inlined/copied/renamed during build, they are essentially part of your source code. This is why it is recommended to place Webpack-processed static assets inside `/src`, along side other source files. In fact, you don't even have to put them all in `/src/assets`: you can organize them based on the module/component using them. For example, you can put each component in its own directory, with its static assets right next to it.

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

We will learn more about the config file in the [next section](backend.md).
