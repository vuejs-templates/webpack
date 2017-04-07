const testAction = (action, args, state, expectedMutations, done) => {
  let count = 0{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

  // Mock Commit
  const commit = (type, payload) => {
    const mutation = expectedMutations[0]{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    expect(mutation.type).to.equal(type){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    if (payload) {
      expect(mutation.payload).to.deep.equal(payload){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }
    count = count + 1{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

    if (count >= expectedMutations.length) {
      done(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }
  }{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

  // call the action with mocked store and arguments
  action({ commit, state }, ...args){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

  // check if no mutations should have been dispatched
  if (expectedMutations.length === 0) {
    expect(count).to.equal(0){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    done(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default testAction{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
