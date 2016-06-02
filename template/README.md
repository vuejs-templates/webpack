# {{ name }}

> {{ description }}

## Tooling
### Config
You can modify the configuration of the build tools, simply within the `config` files. You can change paths, proxy servers and more for webpack.

### ESLint
Included is ESLint config with AirBnB base config. Aligned with Sainsbury's coding standards.

### Tests
*PhantomJS*, *Karma*, *Jasmine* and *Sinon* are preinstalled for testing, example tests is in `test` folder.

Coverage is also provided through Karma. The `index.js` in the test folder adds contexts to test files and applies coverage levels to all files that are not specs.

You can use `codecov.io` as a tool to monitor coverage. You can also see the coverage once running `unit`/`unit:dev`. The output is in `test/coverage`.

To ensure coverage is reported to `codecov.io`, make sure that your chosen `ci` runs after running the tests `npm run report-coverage`.

### Static Assets
Items in the `static` folder will be copied to public folder on `build`, and hosted with the dev-server. This is intended for files that are not to be bundled through Webpack.

### Not included but recommended

* [flow](https://github.com/facebook/flow) (static types) - Useful for ensuring services ect have types checking. Helps development flow and ensures functional code is correcting implemented. Not recommended for component level code as this is more dynamic - services, utilities ect it is perfect for use.
* E2E - This can easily be added. Not included as E2E environments may be hosted separately. Take a look at [e2e vuejs-templates](https://github.com/vuejs-templates/webpack/tree/dist/template/test/e2e) for example configuration.
* [vue-router](https://github.com/vuejs/vue-router) Router for Vue
* [vuex](https://github.com/vuejs/vuex) Flux state management
* [vuex-router-sync](https://github.com/vuejs/vuex-router-sync) Sync *vue-router* with *vuex*
* [vue-resource](https://github.com/vuejs/vue-resource) API resource management

## Dependency control
The chosen ranging with npm is *X-Ranges* To give you more control over dependencies, to ensure breaking changes are less likely to cause difficulties without awareness of dependency update. (This is due to semver not always being adhered).

For example the package JSON versions should look like `1.0.x`.

You can use tools like `bitbound` or `npm-check-updates` to help you check dependencies going out of date, this will encourage you to update often with control.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run all tests and linting
npm test

# run unit tests once
npm run unit

# run unit tests continuously
npm run unit:dev

```

For detailed explanation on how things work, checkout the docs and [docs for vue-loader](http://vuejs.github.io/vue-loader).
