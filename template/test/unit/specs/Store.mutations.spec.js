
import mutations from '@/store/mutations'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const { changeSubWelcomeMsg } = mutations{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

describe('mutations', () => {
  it('changeSubWelcomeMsg', () => {
    // mock state
    const state = {subWelcomeMsg: ''}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    // apply mutation
    changeSubWelcomeMsg(state, 'Test multation State'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    // assert result
    expect(state.subWelcomeMsg).to.equal('Test multation State'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
