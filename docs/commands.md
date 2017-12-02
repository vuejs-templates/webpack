# Build Commands

All build commands are executed via [NPM Scripts](https://docs.npmjs.com/misc/scripts).

### `npm run dev`

> Starts a Node.js local development server. See [API Proxying During Development](proxy.md) for more details.

- Webpack + `vue-loader` for single file Vue components.
- State preserving hot-reload
- State preserving compilation error overlay
- Lint-on-save with ESLint
- Source maps

### `npm run build`

> Build assets for production. See [Integrating with Backend Framework](backend.md) for more details.

- JavaScript minified with [UglifyJS v3](https://github.com/mishoo/UglifyJS2/tree/harmony).
- HTML minified with [html-minifier](https://github.com/kangax/html-minifier).
- CSS across all components extracted into a single file and minified with [cssnano](https://github.com/ben-eb/cssnano).
- All static assets compiled with version hashes for efficient long-term caching, and a production `index.html` is auto-generated with proper URLs to these generated assets.

### `npm run unit`

> Run unit tests in JSDOM with [Jest](https://facebook.github.io/jest/docs/getting-started.html). See [Unit Testing](unit.md) for more details.

- Supports ES2015+ in test files.
- Easy [mocking](https://facebook.github.io/jest/docs/mock-functions.html).

### `npm run e2e`

> Run end-to-end tests with [Nightwatch](http://nightwatchjs.org/). See [End-to-end Testing](e2e.md) for more details.

- Run tests in multiple browsers in parallel.
- Works with one command out of the box:
  - Selenium and chromedriver dependencies automatically handled.
  - Automatically spawns the Selenium server.

### `npm run lint`

> Runs eslint and reports any linting errors in your code. See [Linter Configuration](linter.md)
