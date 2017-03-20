const actions = {
  changeSubWelcomeMsg: ({ commit }, newWelcomeMsg) => {
    commit('changeSubWelcomeMsg', newWelcomeMsg){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
export default actions{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
