{{#unless router}}
import Hello from './components/Hello'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

{{/unless}}
import withRender from './App.html?style=./App.css'

export default withRender({
  name: 'app'{{#router}}{{#if_eq lintConfig "airbnb"}},{{/if_eq}}{{else}},
components: {
  Hello{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}},{{/if_eq}}{{/router}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
