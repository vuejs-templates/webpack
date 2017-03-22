import actions from '@/store/actions'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

import state from '@/store/state'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

import testAction from '../helper'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

describe('actions', () => {
  it('changeSubWelcomeMsg', (done) => {
    testAction(actions.changeSubWelcomeMsg, [], state, [
      { type: 'changeSubWelcomeMsg' }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    ], done){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
