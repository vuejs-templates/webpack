
import getters from '@/store/getters'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

describe('getters', () => {
  it('subWelcomeMsg', () => {
    // mock state
    const state = {subWelcomeMsg: 'Test getters'}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    // apply mutation
    const result = getters.subWelcomeMsg(state){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    // assert result
    expect(result).to.equal(state.subWelcomeMsg){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
