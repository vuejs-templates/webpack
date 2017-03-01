import * as MUTATIONS from './../mutation-types'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const localState = {
  greeting: 'hello {{name}}'{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const localGetters = {
  greeting: {{#if_eq lintConfig "airbnb"}}({{/if_eq}}state => state.greeting{{#if_eq lintConfig "airbnb"}}),{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const actions = {
  setGreeting{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}({ commit }, greeting) {
    commit(MUTATIONS.SET_GREETING, greeting){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

/* eslint-disable no-param-reassign */
const mutations = {
  [MUTATIONS.SET_GREETING]{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}(state, greeting) {
    state.greeting = greeting{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
/* eslint-disable no-param-reassign */

export default {
  state: localState,
  actions,
  getters: localGetters,
  mutations{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
