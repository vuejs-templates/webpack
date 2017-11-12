# Unit Testing

This project offers two options for unit testing:

1. Jest
2. Karma and Mocha.


## Jest

- [Jest](https://facebook.github.io/jest/): the test runner that launches JSDOM runs the tests and reports the results to us.

### Files

- `setup.js`

  Jest runs this file before it runs the unit tests. It sets the Vue production tip to false.

### Mocking Dependencies

The Jest boilerplate comes with the ability to mock dependencies. See the [mock functions guide](https://facebook.github.io/jest/docs/mock-functions.html) for more details.

## Karma and Mocha

- [Karma](https://karma-runner.github.io/): the test runner that launches browsers, runs the tests and reports the results to us.
- [karma-webpack](https://github.com/webpack/karma-webpack): the plugin for Karma that bundles our tests using Webpack.
- [Mocha](https://mochajs.org/): the test framework that we write test specs with.
- [Chai](http://chaijs.com/): test assertion library that provides better assertion syntax.
- [Sinon](http://sinonjs.org/): test utility library that provides spies, stubs and mocks.

Chai and Sinon are integrated using [karma-sinon-chai](https://github.com/kmees/karma-sinon-chai), so all Chai interfaces (`should`, `expect`, `assert`) and `sinon` are globally available in test files.

### Files

- `index.js`

  This is the entry file used by `karma-webpack` to bundle all the test code and source code (for coverage purposes). You can ignore it for the most part.

- `specs/`

  This directory is where you write your actual tests. You can use full ES2015+ and all supported Webpack loaders in your tests.

- `karma.conf.js`

  This is the Karma configuration file. See [Karma docs](https://karma-runner.github.io/) for more details.

### Running Tests in More Browsers

You can run the tests in multiple real browsers by installing more [karma launchers](https://karma-runner.github.io/1.0/config/browsers.html) and adjusting the `browsers` field in `test/unit/karma.conf.js`.

### Mocking Dependencies

The Karma unit test boilerplate comes with [inject-loader](https://github.com/plasticine/inject-loader) installed by default. For usage with `*.vue` components, see [vue-loader docs on testing with mocks](http://vue-loader.vuejs.org/en/workflow/testing-with-mocks.html).
