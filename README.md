# vue-webpack-boilerplate

This is a project template for [Khaos](https://github.com/segmentio/khaos), a simple project scaffolder.

### Usage

``` bash
npm install -g khaos
```

``` bash
khaos create vuejs/webpack-boilerplate my-project
# answer prompts...
cd my-project
npm install
npm run dev
```

### What's Included

- `npm run dev`: Webpack + `vue-loader` with hot-reload development setup.

- `npm run build`: Production ready build with minification and CSS extraction.

- `npm test`: Unit tests in PhantomJS with Karma + karma-webpack, supporting all webpack loaders, [mock injection](http://vuejs.github.io/vue-loader/workflow/testing-with-mocks.html) and ES2015.

### Customizations

You will likely need to do some tuning to suit your own needs:

- Install additional libraries that you need, e.g. `vue-router`, `vue-resource`, `vuex`, etc...

- Use your preferred `.eslintrc` config;

- Add your preferred CSS pre-processor, for example:

  ``` bash
  npm install less-loader --save-dev
  ```

- In `build/webpack.base.conf.js`, add `devServer.proxy` field to work with an existing backend server. See [docs for webpack dev server proxy](https://webpack.github.io/docs/webpack-dev-server.html#proxy).

### Fork It And Make Your Own

You can fork this repo to create your own boilerplate, and use it with Khaos:

``` bash
khaos create username/repo my-project
```
