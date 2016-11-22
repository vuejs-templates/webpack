{{#if_eq lintConfig "airbnb"}}/* eslint-disable no-param-reassign */
{{/if_eq}}export default {
  increment{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}(state) {
    state.counter += 1{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
