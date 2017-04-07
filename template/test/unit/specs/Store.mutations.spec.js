
import mutations from '@/store/mutations'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const { changeSubWelcomeMsg } = mutations{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

describe('mutations', () => {
  it('changeSubWelcomeMsg', () => {
    const state = { subWelcomeMsg: '' }{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    changeSubWelcomeMsg(state, 'Test multation State'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    expect(state.subWelcomeMsg).to.equal('Test multation State'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
