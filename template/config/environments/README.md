## Using Environments

To get a quick overview about how environemnt variables are handled in this templae, read the docs:

http://vuejs-templates.github.io/webpack/env


## Defining new Environments

Let's say you want to define a new environment called `staging`. This environment should behave in the following way:

* It should behave like in production in that warning etc. are stripped out
* It should set the `process.env.API_URL` variable to point to the staging backend.

Here's what you do:

1. create a File called `staging.env.js` in this folder
2. add this to the file:
```javascript
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"' // this makes Vue strip out
  API_URL '"http://staging.yourbackend.com/api"'
})
```

Now you can build our app on your `staging` server using this env like this:
```
npm run build --app-env staging
// or:
VUE_APP_ENV=staging npm run build
```
you can use the second approach for tests, too:
```
VUE_APP_ENV=staging npm run test
```