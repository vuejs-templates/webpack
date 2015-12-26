# vue-webpack-boilerplate

> A full-featured Webpack setup with linting, testing & css extraction.

### Usage

``` bash
$ npm install -g vue-cli
$ vue init webpack my-project
$ cd my-project
$ npm install
$ npm run dev
```

### What's Included

- `npm run dev`: Webpack + `vue-loader` with proper config for hot-reload, source maps, and lint-on-save with ESLint.

- `npm run build`: Production ready build with HTML/CSS/JS minification and CSS extracted into a single file.

- `npm test`: Unit tests in PhantomJS with Karma + karma-jasmine + karma-webpack, supporting all webpack loaders, [mock injection](http://vuejs.github.io/vue-loader/workflow/testing-with-mocks.html) and ES2015.

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

### Customizations

You will likely need to do some tuning to suit your own needs:

- Install additional libraries that you need, e.g. `vue-router`, `vue-resource`, `vuex`, etc...

- Use your preferred `.eslintrc` config.

- Add your preferred CSS pre-processor, for example:

  ``` bash
  npm install less-loader --save-dev
  ```

- In `build/webpack.base.conf.js`:

  - Adjust `output.path` if you want the built file to be generated at a different location.

  - Add `devServer.proxy` field if you want to work with an existing backend server. See [docs for webpack dev server proxy](https://webpack.github.io/docs/webpack-dev-server.html#proxy).

- For unit testing:

  - You can run the tests in multiple real browsers by installing more [karma launchers](http://karma-runner.github.io/0.13/config/browsers.html) and adjusting the `browsers` field in `build/karma.conf.js`.

  - You can also swap out Jasmine for other testing frameworks, e.g. use Mocha with [karma-mocha](https://github.com/karma-runner/karma-mocha).

### Fork It And Make Your Own

You can fork this repo to create your own boilerplate, and use it with Khaos:

``` bash
khaos create username/repo my-project
```
