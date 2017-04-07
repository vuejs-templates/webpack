const mutations = {
  changeSubWelcomeMsg: (state, newWelcomeMsg) => {
    /* eslint-disable no-param-reassign */
    state.subWelcomeMsg = newWelcomeMsg{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
export default mutations{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
