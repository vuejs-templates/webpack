
import getters from '@/store/getters'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

describe('getters', () => {
  it('subWelcomeMsg', () => {
    const state = { subWelcomeMsg: 'Test getters' }{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    const result = getters.subWelcomeMsg(state){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    expect(result).to.equal(state.subWelcomeMsg){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
