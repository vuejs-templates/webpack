import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import lodash from 'lodash'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import * from MUTATIONS from './../mutation-types'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const localState = {
  greeting: 'hello'{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const localGetters = {
  greeting: (state => state.greeting){{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const actions = {
  setGreeting({ commit }, greeting) {
    commit(MUTATIONS.SET_GREETING, greeting);
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

/* eslint-disable no-param-reassign */
const mutations = {
  [MUTATIONS.SET_GREETING](state, greeting) {
    state.greeting = greeting;
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
/* eslint-disable no-param-reassign */

export default {
  state: localState,
  actions,
  getters: localGetters,
  mutations{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
