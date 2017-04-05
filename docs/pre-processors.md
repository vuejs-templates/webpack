# Pre-Processors

This boilerplate has pre-configured CSS extraction for most popular CSS pre-processors including LESS, SASS, Stylus, and PostCSS. To use a pre-processor, all you need to do is installing the appropriate webpack loader for it. For example, to use SASS:

``` bash
npm install sass-loader node-sass --save-dev
```

Note you also need to install `node-sass` because `sass-loader` depends on it as a peer dependency.

### Using Pre-Processors inside Components

Once installed, you can use the pre-processors inside your components using the preprocessor name as file extension:

```
import withRender from './Hello.html?style=./Hello.scss'

export default withRender({
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
})

```

### A note on SASS syntax

- `scss` corresponds to the CSS-superset syntax (with curly braces and semicolones).
- `sass` corresponds to the indentation-based syntax.
