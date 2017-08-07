# Prerendering for SEO

If you want to prerender routes that will not significantly change once pushed to production, use this Webpack plugin: [prerender-spa-plugin](https://www.npmjs.com/package/prerender-spa-plugin), which has been tested for use with Vue. For pages that _do_ frequently change, [Prerender.io](https://prerender.io/) and [Netlify](https://www.netlify.com/pricing) both offer plans for regularly re-prerendering your content for search engines.

## Using `prerender-spa-plugin`

1. Install it as a dev dependency:

```bash
npm install --save-dev prerender-spa-plugin
```

2. Require it in **build/webpack.prod.conf.js**:

```js
// This line should go at the top of the file where other 'imports' live in
var PrerenderSpaPlugin = require('prerender-spa-plugin')
```

3. Configure it in the `plugins` array (also in **build/webpack.prod.conf.js**):

```js
new PrerenderSpaPlugin(
  // Path to compiled app
  path.join(__dirname, '../dist'),
  // List of endpoints you wish to prerender
  [ '/' ]
)
```

If you also wanted to prerender `/about` and `/contact`, then that array would be `[ '/', '/about', '/contact' ]`.

4. Enable history mode for `vue-router`:
```js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```
