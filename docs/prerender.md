# Prerendering for SEO

If you want to prerender routes that will not significantly change once pushed to production, use this Webpack plugin: [prerender-spa-plugin](https://www.npmjs.com/package/prerender-spa-plugin), which has been tested for use with Vue. For pages that _do_ frequently change, [Prerender.io](https://prerender.io/) and [Netlify](https://www.netlify.com/pricing) both offer plans for regularly re-prerendering your content for search engines.

### Using Prerenderer SPA Plugin
In order to use Prerenderer SPA Webpack Plugin you need to require it.
```bash
npm install prerender-spa-plugin --save-dev
```

Next you need to declare its usage by adding this code into **build/webpack.prod.conf.js**:
```js
// This line should go at the top of the file where other 'imports' live in
var PrerenderSpaPlugin = require('prerender-spa-plugin')
```

After that simply add this instantiation into your `plugins` array inside **build/webpack.prod.conf.js**:
```js
new PrerenderSpaPlugin(
  path.join(__dirname, '../dist'),
  [ '/' ] // here declare all endpoints you wish to prerender e.g. /about, /contact
)
```

That should be it. If you don't get any errors you are good to go.
