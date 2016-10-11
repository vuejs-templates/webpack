import Hello from './Hello'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export {
  Hello{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default {}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
