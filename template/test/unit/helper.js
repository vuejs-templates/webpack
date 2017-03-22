const testAction = (action, args, state, expectedMutations, done) => {
  let count = 0

  // Mock Commit
  const commit = (type, payload) => {
    const mutation = expectedMutations[0]
    expect(mutation.type).to.equal(type)
    if (payload) {
      expect(mutation.payload).to.deep.equal(payload)
    }
    count++

    if (count >= expectedMutations.length) {
      done()
    }
  }

  // call the action with mocked store and arguments
  action({ commit, state }, ...args)

  // check if no mutations should have been dispatched
  if (expectedMutations.length === 0) {
    expect(count).to.equal(0)
    done()
  }
}

export default testAction
