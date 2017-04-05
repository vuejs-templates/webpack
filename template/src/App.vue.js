import withRender from './App.html?style=./App.css'{{#if_eq eslintConfig "airbnb"}};{{/if_eq}}

{{#unless router}}
import Hello from './components/Hello.vue'{{#if_eq eslintConfig "airbnb"}};{{/if_eq}}

{{/unless}}
export default withRender({
  name: 'app'{{#router}}{{#if_eq eslintConfig "airbnb"}},{{/if_eq}}{{else}},
  components: { Hello }{{#if_eq eslintConfig "airbnb"}},{{/if_eq}}{{/router}}
}){{#if_eq eslintConfig "airbnb"}};{{/if_eq}}
