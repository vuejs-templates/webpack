export default {
  increment{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}({ commit }) {
    commit('increment'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
