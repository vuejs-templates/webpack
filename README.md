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

- `npm test`: Unit tests in PhantomJS with Karma + karma-jasmine + karma-webpack, supporting all webpack loaders, [mock injection](http://vuejs.github.io/vue-loader/workflow/testing-with-mocks.html) and ES2015.

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
