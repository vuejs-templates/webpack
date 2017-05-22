# API Proxying During Development

When integrating this boilerplate with an existing backend, a common need is to access the backend API when using the dev server. To achieve that, we can run the dev server and the API backend side-by-side (or remotely), and let the dev server proxy all API requests to the actual backend.

To configure the proxy rules, edit `dev.proxyTable` option in `config/index.js`. The dev server is using [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) for proxying, so you should refer to its docs for detailed usage. But here's a simple example:

``` js
// config/index.js
module.exports = {
  // ...
  dev: {
    proxyTable: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
```

The above example will proxy the request `/api/posts/1` to `http://jsonplaceholder.typicode.com/posts/1`.

## URL Matching

In addition to static urls you can also use glob patterns to match URLs, e.g. `/api/**`. See [Context Matching](https://github.com/chimurai/http-proxy-middleware#context-matching) for more details. In addition, you can provide a `filter` option that can be a custom function to determine whether a request should be proxied:

``` js
proxyTable: {
  '*': {
    target: 'http://jsonplaceholder.typicode.com',
    filter: function (pathname, req) {
      return pathname.match('^/api') && req.method === 'GET'
    }
  }
}
```
