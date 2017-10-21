const devEnv = require('./dev.env')

export default merge(devEnv, {
  env: {
    NODE_ENV: '"testing"'
  }
});
