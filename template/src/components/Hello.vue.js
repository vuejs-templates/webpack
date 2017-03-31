import withRender from './Hello.html?style=./Hello.css'

export default withRender({
  name: 'hello',
  data{{#unless_eq eslintConfig "airbnb"}} {{/unless_eq}}() {
    return {
      msg: 'Welcome to Your Vue.js App'{{#if_eq eslintConfig "airbnb"}},{{/if_eq}}
    }{{#if_eq eslintConfig "airbnb"}};{{/if_eq}}
  }{{#if_eq eslintConfig "airbnb"}},{{/if_eq}}
}){{#if_eq eslintConfig "airbnb"}};{{/if_eq}}
